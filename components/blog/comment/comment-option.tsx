import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';

const CommentOption = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 font-medium" align="end">
        <DropdownMenuItem>
          <div>Edit</div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div>Delete</div>
        </DropdownMenuItem>
        {/* //! add report option */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentOption;
