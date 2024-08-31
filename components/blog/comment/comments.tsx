'use client';

import { Suspense, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createComment, createReply } from '@/actions/blog/comment.action';
import Comment from '@/components/blog/comment/comment';
import { AutosizeTextarea } from '@/components/ui/auto-resize-textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import {
  addComment,
  addReply,
  hydrateComments,
} from '@/redux/features/comments/commentsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { commentSchema } from '@/schema/validation/comment-schema';
import { CommentModel } from '@/types/blog';
import { zodResolver } from '@hookform/resolvers/zod';

interface CommentProps {
  slug: string;
  comments: CommentModel[];
  totalCommentsCount: number;
}

const Comments = ({ slug, comments, totalCommentsCount }: CommentProps) => {
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const { comments: initialComments, totalCommentsCount: storeCommentsCount } =
    useAppSelector((state: RootState) => state.comments);

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: { message: '' },
  });

  useEffect(() => {
    dispatch(hydrateComments({ comments, totalCommentsCount }));
  }, [dispatch, comments, totalCommentsCount]);

  const onSubmitComment = (value: z.infer<typeof commentSchema>) => {
    startTransition(async () => {
      const { data, error } = await createComment({
        slug,
        message: value.message,
      });
      if (data) {
        dispatch(addComment(data));
        form.reset();
      } else {
        toast.error(error);
      }
    });
  };

  const handleAddReply = async (parentId: string, message: string) => {
    const { data } = await createReply({ slug, parentId, message });
    if (data) {
      dispatch(addReply(data));
    } else {
      toast.error('Failed to post reply.');
    }
  };

  return (
    <section id="comments" className="mx-auto my-12 w-full max-w-4xl">
      <h2 className="mb-6 text-lg font-bold lg:text-2xl">
        {`Discussion (${storeCommentsCount})`}
      </h2>

      <Suspense fallback={<Spinner size="large" />}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitComment)}
            className="mb-6 space-y-8"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AutosizeTextarea
                      {...field}
                      disabled={isPending}
                      className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-gray-300"
                      placeholder="Write a comment..."
                      minHeight={140}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="px-4 py-2.5 text-xs font-medium"
              disabled={isPending}
            >
              <Spinner
                size="small"
                className="mr-2 text-black"
                show={isPending}
              />
              Post comment
            </Button>
          </form>
        </Form>
      </Suspense>

      <div>
        {initialComments.map((comment: any) => (
          <Comment
            key={comment.id}
            comment={comment}
            addReply={handleAddReply}
            slug={slug}
          />
        ))}
      </div>
    </section>
  );
};

export default Comments;
