import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { deleteBlogbySlug } from '@/actions/blog/delete-blog.action';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { closeDeleteBlogModal } from '@/redux/features/modals/modalsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const DeleteBlogModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOpen, slug } = useAppSelector(
    (state) => state.modals.deleteBlogModal
  );

  const handleOpenChange = () => {
    dispatch(closeDeleteBlogModal());
  };

  const handleClick = async () => {
    try {
      const { success, error } = await deleteBlogbySlug(slug);
      if (success) {
        toast.success('Blog deleted successfully');
        revalidatePath('/blog');
        router.push('/blog');
      } else {
        toast.error(error);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-red-500">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this blog
            and remove your data from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBlogModal;
