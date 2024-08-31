import { Ellipsis } from 'lucide-react';
import { toast } from 'sonner';

import { deleteComment } from '@/actions/blog/comment.action';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrentUser } from '@/hooks/use-current-user';
import { deleteInitialComment } from '@/redux/features/comments/commentsSlice';
import { useAppDispatch } from '@/redux/hooks';

interface CommentOptionProps {
  commentId: string;
  commentUserId: string;
}

const CommentOption = ({ commentId, commentUserId }: CommentOptionProps) => {
  const dispatch = useAppDispatch();
  const user = useCurrentUser();
  const isOwner = user?.id === commentUserId;

  const handleEdit = () => {
    console.log('Edit');
  };

  const handleDelete = async () => {
    try {
      const { success, error } = await deleteComment({ commentId });
      if (success) {
        dispatch(deleteInitialComment(commentId));
        toast.success(success);
      } else {
        toast.error(error);
      }
    } catch (error) {
      toast.error('An error occurred while deleting the comment');
    }
  };

  const handleReport = () => {
    toast('This functionality is not implemented yet');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button asChild variant="ghost" size="xs" className="h-5">
          <Ellipsis size={28} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 p-2 font-medium" align="end">
        {isOwner && (
          <>
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={handleReport}>Report</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentOption;
