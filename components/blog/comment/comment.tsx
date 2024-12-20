'use client';

import { useState } from 'react';
import { Reply, Zap } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { togglecommentLike } from '@/actions/blog/comment.action';
import CommentOption from '@/components/blog/comment/comment-option';
import { AutosizeTextarea } from '@/components/ui/auto-resize-textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useCurrentUser } from '@/hooks/use-current-user';
import { formatDateFromNow } from '@/lib/utils';
import { toggleLike } from '@/redux/features/comments/commentsSlice';
import { useAppDispatch } from '@/redux/hooks';
import { commentSchema } from '@/schema/validation/comment-schema';
import { CommentModel } from '@/types/blog';
import { zodResolver } from '@hookform/resolvers/zod';

interface CommentProps {
  comment: CommentModel;
  addReply: (commentId: string, replyText: string) => void;
  slug: string;
}

const Comment = ({ comment, addReply, slug }: CommentProps) => {
  const user = useCurrentUser();
  const dispatch = useAppDispatch();
  const [showReplyBox, setShowReplyBox] = useState(false);

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: { message: '' },
  });

  const isLikedByUser = comment.commentLikes.some(
    (like) => like.userId === user?.id
  );

  const handleReplySubmit = (value: z.infer<typeof commentSchema>) => {
    addReply(comment.id, value.message);
    setShowReplyBox(false);
    form.reset();
  };

  const toggleCommentLike = async () => {
    if (!user) {
      toast.error('You need to be logged in to like a comment');
      return;
    }
    const { error, success } = await togglecommentLike({
      commentId: comment.id,
    });
    if (success) {
      dispatch(toggleLike({ commentId: comment.id, userId: user.id! }));
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="grid gap-8 py-6" key={comment.id}>
      <div className="flex items-start gap-4 text-sm">
        <div className="flex h-full flex-col items-center gap-2">
          <Avatar className="size-10 border">
            <AvatarImage src={comment.user?.image || ''} />
            <AvatarFallback>{comment.user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <Separator orientation="vertical" className="shrink" />
        </div>

        <div className="flex w-full flex-col">
          <div className="mb-1 grid gap-2 py-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <div className="font-semibold">{comment.user?.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDateFromNow(comment.createdAt)}
                </div>
              </div>
              <div>
                <CommentOption
                  commentId={comment.id}
                  commentUserId={comment.user.id!}
                />
              </div>
            </div>
            <div>{comment.message}</div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="xs" onClick={toggleCommentLike}>
                <Zap
                  strokeWidth={isLikedByUser ? 0 : 1.5}
                  fill={isLikedByUser ? '#f43f5e' : 'none'}
                  className="mr-1"
                  size={18}
                />
                {isLikedByUser ? 'Zaped' : 'Zap'}
              </Button>
              {comment.commentLikes.length > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {comment.commentLikes.length} zap
                  {comment.commentLikes.length > 1 ? 's' : ''}
                </div>
              )}
              {!showReplyBox && (
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => {
                    setShowReplyBox(true);
                  }}
                >
                  <Reply className="mr-1" size={18} />
                  Reply
                </Button>
              )}
            </div>
          </div>
          {comment?.children && comment?.children?.length > 0 && (
            <div>
              {comment.children?.map((childComment: CommentModel) => (
                <Comment
                  key={childComment.id}
                  comment={childComment}
                  addReply={addReply}
                  slug={slug}
                />
              ))}
            </div>
          )}

          {showReplyBox && (
            <>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleReplySubmit)}
                  className="mb-6 space-y-5 p-2"
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <AutosizeTextarea
                            {...field}
                            className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-gray-300"
                            placeholder="Write a comment..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="px-3 text-xs font-medium"
                      size="sm"
                    >
                      <Spinner
                        size="small"
                        className="mr-2 text-black"
                        show={false}
                      />
                      Reply
                    </Button>
                    <Button
                      onClick={() => {
                        setShowReplyBox(false);
                      }}
                      className="px-3 text-xs font-medium"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
