import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, LogOut, User } from 'lucide-react';

import { LogoutButton } from '@/components/auth/logout-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CurrentUser } from '@/lib/auth';

export default async function UserButton() {
  const user = await CurrentUser();

  const username = user?.name?.split(' ')[1] || user?.email?.split('@')[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.image || ''} alt="user photo" />
          <AvatarFallback className="bg-sky-500">
            <User className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 font-medium" align="end">
        <DropdownMenuItem>
          <User className="mr-2 size-4" />
          <span>{username}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user?.role === 'ADMIN' && (
            <Link href="/dashboard">
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 size-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          )}
          {/* something later like personal notes in dashboard */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem>
            <LogOut className="mr-2 size-4" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
