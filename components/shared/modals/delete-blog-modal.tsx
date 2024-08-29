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
import { useDeleteBlogModal } from '@/zustand/use-delete-blog';

const DeleteBlogModal = () => {
  const { isOpen, onClose, slug } = useDeleteBlogModal();
  const router = useRouter();

  const handleClick = async () => {
    toast.promise(
      deleteBlogbySlug(slug)
        .then(() => {
          router.push('/blog');
        })
        .catch(() => {}),
      {
        loading: 'Deleting blog...',
        success: 'Blog deleted successfully.',
        error: "Oops! Couldn't delete blog.",
      }
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
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
