'use client';

import { useEffect, useTransition } from 'react';
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
import { useCurrentUser } from '@/hooks/use-current-user';
import { useComment } from '@/zustand/use-Comment';
import { commentSchema } from '@/schema/validation/comment-schema';
import { CommentModel } from '@/types/blog';
import { zodResolver } from '@hookform/resolvers/zod';

interface CommentProps {
  slug: string;
  comments: CommentModel[];
  totalCommentsCount: number;
}

const Comments = ({ slug, comments, totalCommentsCount }: CommentProps) => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const { initialComments, setInitialComments, addComment, addReply } =
    useComment();

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: { message: '' },
  });

  useEffect(() => {
    setInitialComments(comments);
  }, [comments, setInitialComments]);

  const onSubmitComment = (value: z.infer<typeof commentSchema>) => {
    startTransition(async () => {
      const status = await createComment({ slug, message: value.message });
      if (status?.success) {
        addComment({
          ...status.data,
          user: {
            name: user?.name ?? '',
            image: user?.image ?? '',
            id: user?.id ?? '',
          },
          children: [],
          commentLikes: [],
        });
        form.reset();
      } else {
        toast.error(status.error || 'Failed to post comment.');
      }
    });
  };

  const handleAddReply = async (parentId: string, message: string) => {
    const status = await createReply({ slug, parentId, message });
    if (status?.success) {
      addReply({
        ...status.data,
        children: [],
        commentLikes: [],
        user: {
          name: user?.name ?? '',
          image: user?.image ?? '',
          id: user?.id ?? '',
        },
      });
    } else {
      toast.error(status?.error || 'Failed to post reply.');
    }
  };

  return (
    <section className="mx-auto my-12 w-full max-w-4xl">
      <h2 className="mb-6 text-lg font-bold lg:text-2xl">
        {`Discussion (${totalCommentsCount})`}
      </h2>

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
