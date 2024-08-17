import React from 'react';
import { useRouter } from 'next/navigation';
import { Ellipsis } from 'lucide-react';
import slugify from 'slugify';
import { toast } from 'sonner';

import { deleteBlogbySlug } from '@/actions/blog/blog.action';
import {
  updateBlogPriority,
  updateBlogStatus,
} from '@/actions/blog/table.action';
import {
  priorities,
  statuses,
} from '@/components/blog/dataTable/constants/data';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { blogSchema } from '@/schema/validation/user-table-schema';
import { Row } from '@tanstack/react-table';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const blog = blogSchema.parse(row.original);
  const router = useRouter();
  const slug = slugify(blog.title, { lower: true });

  const handlePriorityChange = async (newPriority: string) => {
    try {
      const status = await updateBlogPriority(slug, newPriority);
      if (status.success) {
        toast.success('Good job! Priority updated successfully.');
      } else if (status.error) {
        toast.error(status.message);
      }
    } catch (error) {
      toast.error("Oops! Couldn't update priority.");
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const status = await updateBlogStatus(slug, newStatus);

      if (status.success) {
        toast.success('Good job! Status updated successfully.');
      } else if (status.error) {
        toast.error(status.message);
      }
    } catch (error) {
      toast.error("Oops! Couldn't update status.");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await deleteBlogbySlug(slug);

      if (response.success) {
        toast.success(response.message);
      } else if (response.error) {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Why are you deleting this! Couldn't delete blog.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            router.push(`/dashboard/edit/${slug}`);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={blog.priority}
              onValueChange={handlePriorityChange}
            >
              {priorities.map((priority) => (
                <DropdownMenuRadioItem
                  key={priority.value}
                  value={priority.value}
                >
                  {priority.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={blog.status}
              onValueChange={handleStatusChange}
            >
              {statuses.map((status) => (
                <DropdownMenuRadioItem key={status.value} value={status.value}>
                  <div className="flex items-center">
                    {status.icon && <status.icon className="mr-2 size-4" />}
                    {status.label}
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleDeleteClick}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
