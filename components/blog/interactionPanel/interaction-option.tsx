import { useRouter } from 'next/navigation';
import { Ellipsis } from 'lucide-react';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrentRole } from '@/hooks/use-current-role';
import {
  openDeleteBlogModal,
  setSlug,
} from '@/redux/features/modals/modalsSlice';
import { useAppDispatch } from '@/redux/hooks';

interface InteractionOptionProps {
  slug: string;
}

const InteractionOption = ({ slug }: InteractionOptionProps) => {
  const role = useCurrentRole();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    router.push(`/dashboard/edit/${slug}`);
  };

  const handleDelete = async () => {
    try {
      dispatch(openDeleteBlogModal(), setSlug(slug));
    } catch (error) {
      toast.error('An error occurred ');
    }
  };

  const handleReport = () => {
    toast('This functionality is not implemented yet');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis
          size={30}
          strokeWidth={1.5}
          className="cursor-pointer hover:scale-110 hover:text-green-700 hover:transition"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 p-2 font-medium" align="end">
        {role === 'ADMIN' && (
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

export default InteractionOption;
