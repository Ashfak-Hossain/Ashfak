import { CommentModel } from '@/types/blog';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [] as CommentModel[],
    totalCommentsCount: 0,
  },
  reducers: {
    hydrateComments: (
      state,
      action: PayloadAction<{
        comments: CommentModel[];
        totalCommentsCount: number;
      }>
    ) => {
      state.comments.length = 0;
      state.comments.push(...action.payload.comments);
      state.totalCommentsCount = action.payload.totalCommentsCount;
    },
    addComment: (state, action: PayloadAction<CommentModel>) => {
      state.comments.unshift(action.payload);
      state.totalCommentsCount += 1;
    },
    addReply: (state, action: PayloadAction<CommentModel>) => {
      const addReplyToComments = (comments: CommentModel[]): CommentModel[] => {
        return comments.map((comment) => {
          if (comment.id === action.payload.parentId) {
            return {
              ...comment,
              children: [action.payload, ...comment.children],
            };
          }
          return {
            ...comment,
            children: addReplyToComments(comment.children),
          };
        });
      };

      state.comments = addReplyToComments(state.comments);
      state.totalCommentsCount += 1;
    },
    toggleLike: (
      state,
      action: PayloadAction<{ commentId: string; userId: string }>
    ) => {
      const toggleLikeInComments = (
        comments: CommentModel[]
      ): CommentModel[] => {
        return comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            const hasLiked = comment.commentLikes.some(
              (like: any) => like.userId === action.payload.userId
            );
            return {
              ...comment,
              commentLikes: hasLiked
                ? comment.commentLikes.filter(
                    (like: any) => like.userId !== action.payload.userId
                  )
                : [
                    ...comment.commentLikes,
                    {
                      userId: action.payload.userId,
                      commentId: action.payload.commentId,
                    },
                  ],
            };
          }
          return {
            ...comment,
            children: toggleLikeInComments(comment.children),
          };
        });
      };

      state.comments = toggleLikeInComments(state.comments);
    },
    deleteInitialComment: (state, action: PayloadAction<string>) => {
      const removeComment = (comments: CommentModel[]): CommentModel[] => {
        return comments
          .filter((comment) => comment.id !== action.payload)
          .map((comment) => ({
            ...comment,
            children: removeComment(comment.children),
          }));
      };
      state.comments = removeComment(state.comments);
      state.totalCommentsCount -= 1;
    },
  },
});

export default commentsSlice.reducer;
export const {
  hydrateComments,
  addComment,
  addReply,
  toggleLike,
  deleteInitialComment,
} = commentsSlice.actions;
