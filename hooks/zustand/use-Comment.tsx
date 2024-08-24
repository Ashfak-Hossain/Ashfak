import { CommentModel } from '@/types/blog';
import { create } from 'zustand';

type CommentStore = {
  initialComments: CommentModel[];
  setInitialComments: (comments: CommentModel[]) => void;
  addComment: (comment: CommentModel) => void;
  addReply: (reply: CommentModel) => void;
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
}));
