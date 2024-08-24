'use client';

import { AutosizeTextarea } from '@/components/ui/auto-resize-textarea';
import { Button } from '@/components/ui/button';
import { useEffect, useTransition } from 'react';
import Comment from '@/components/blog/comment/comment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { commentSchema } from '@/schema/validation/comment-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { createComment, createReply } from '@/actions/blog/comment.action';
import { Spinner } from '@/components/ui/spinner';
import { z } from 'zod';
import { useComment } from '@/hooks/zustand/use-Comment';
import { useCurrentUser } from '@/hooks/use-current-user';
import { CommentModel } from '@/types/blog';
import { toast } from 'sonner';

interface CommentProps {
  slug: string;
  comments: CommentModel[];
}

const Comments = ({ slug, comments }: CommentProps) => {
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
  }, [comments]);

  const newCommentSubmit = (value: z.infer<typeof commentSchema>) => {
    startTransition(async () => {
      const status = await createComment({ slug, message: value.message });
      if (status?.success) {
        addComment({
          ...status.data,
          user: { name: user?.name ?? '', image: user?.image ?? '' },
          children: [],
        });
        form.reset();
      }
    });
  };

  const handleAddReply = async (parentId: string, message: string) => {
    const status = await createReply({ slug, parentId, message });
    if (status?.success) {
      addReply({
        ...status.data,
        children: [],
      });
    } else {
      toast.error(status?.error);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-12">
      <h2 className="text-lg lg:text-2xl font-bold mb-6">
        {`Discussion (${initialComments.length})`}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(newCommentSubmit)}
          className="space-y-8 mb-6"
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
                    className="border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-300"
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
            className="py-2.5 px-4 text-xs font-medium"
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
          />
        ))}
      </div>
    </section>
  );
};

export default Comments;
