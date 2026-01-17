'use client';

import { LogOutIcon, UserCircleIcon } from 'lucide-react';
import type { FC } from 'react';

import { useLogout } from '@/features/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

export const Header: FC = () => {
  const { mutate: logout, isPending } = useLogout();

  return (
    <header className="border-border bg-background sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4">
      <h1 className="text-2xl font-bold">My Todos</h1>
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserCircleIcon className="size-9 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => logout()} disabled={isPending}>
              <LogOutIcon />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
