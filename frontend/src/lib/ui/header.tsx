'use client';

import { useEffect } from 'react';
import { useSidebar } from './sidebar-provider';
import { Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAuth from '@/utils/hooks/useAuth';

export function Header() {
  const { toggle } = useSidebar();
  const {
    user,
    isAuthenticated,
    isPending,
    sessionError,
    // refetchSession,
    signOut,
  } = useAuth();

  useEffect(() => {
    if (user) {
      console.log(user);
    }
    if (isPending) {
      console.log('Loading...');
    }
    if (sessionError) {
      console.log(`Error: ${sessionError.message}`);
    }
    if (!isAuthenticated) {
      console.log('Not authenticated');
    }
  }, [isAuthenticated, isPending, sessionError, user]);

  const handleSignOut = async () => {
    await signOut();
    // Redirect to login page
  };

  return (
    <header className='sticky top-0 z-40 border-b bg-background'>
      <div className='flex h-14 items-center px-4 gap-4'>
        <Button
          variant='ghost'
          size='icon'
          className='lg:hidden'
          onClick={toggle}
        >
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle sidebar</span>
        </Button>

        <div className='flex-1'>
          <form>
            <div className='relative max-w-md'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search...'
                className='w-full pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
              />
            </div>
          </form>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 rounded-full cursor-pointer'
            >
              <User className='h-4 w-4' />
              <span className='sr-only'>User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer'>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={handleSignOut}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
