import { CommentModel } from '@/types/blog';
import { create } from 'zustand';

type CommentStore = {
  initialComments: CommentModel[];
  setInitialComments: (comments: CommentModel[]) => void;
  addComment: (comment: CommentModel) => void;
  addReply: (reply: CommentModel) => void;
  toggleLike: (commentId: string, userId: string) => void;
  deleteInitialComment: (commentId: string) => void;
};

export const useComment = create<CommentStore>((set) => ({
  initialComments: [],
  setInitialComments: (comments) => set({ initialComments: comments }),

  addComment: (comment) =>
    set((state) => ({
      initialComments: [comment, ...state.initialComments],
    })),

  addReply: (reply) =>
    set((state) => {
      const addReplyToComments = (comments: CommentModel[]): CommentModel[] => {
        return comments.map((comment) => {
          if (comment.id === reply.parentId) {
            return {
              ...comment,
              children: [reply, ...comment.children],
            };
          }
          return {
            ...comment,
            children: addReplyToComments(comment.children),
          };
        });
      };

      return {
        initialComments: addReplyToComments(state.initialComments),
      };
    }),

  toggleLike: (commentId, userId) =>
    set((state) => {
      const toggleLikeInComments = (
        comments: CommentModel[]
      ): CommentModel[] => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            const hasLiked = comment.commentLikes.some(
              (like: any) => like.userId === userId
            );
            return {
              ...comment,
              commentLikes: hasLiked
                ? comment.commentLikes.filter(
                    (like: any) => like.userId !== userId
                  )
                : [...comment.commentLikes, { userId, commentId }],
            };
          }
          return {
            ...comment,
            children: toggleLikeInComments(comment.children),
          };
        });
      };

      return {
        initialComments: toggleLikeInComments(state.initialComments),
      };
    }),

  deleteInitialComment: (commentId: string) =>
    set((state) => {
      const removeComment = (comments: CommentModel[]): CommentModel[] => {
        return comments
          .filter((comment) => comment.id !== commentId)
          .map((comment) => ({
            ...comment,
            children: removeComment(comment.children),
          }));
      };

      return {
        initialComments: removeComment(state.initialComments),
      };
    }),
}));
