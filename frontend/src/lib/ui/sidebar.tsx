'use client';

import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from './sidebar-provider';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
  Menu,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { signOut, useSession } from '@/lib/auth-client';

export function Sidebar() {
  const location = useLocation();
  const { isOpen, toggle } = useSidebar();
  //   const { data: session } = useSession();

  //   const handleSignOut = async () => {
  //     await signOut();
  //   };

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden',
          isOpen ? 'block' : 'hidden'
        )}
        onClick={toggle}
      />
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-background',
          'transition-transform duration-300 ease-in-out',
          'border-r',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className='flex h-14 items-center border-b px-4'>
          <span className='text-lg font-semibold'>Sambo Admin</span>
          <Button
            variant='ghost'
            size='icon'
            className='ml-auto lg:hidden'
            onClick={toggle}
          >
            <Menu className='h-5 w-5' />
          </Button>
        </div>
        <div className='flex flex-col h-[calc(100vh-3.5rem)]'>
          <div className='flex-1 overflow-auto py-2'>
            <nav className='grid gap-1 px-2'>
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    location.pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <item.icon className='h-5 w-5' />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className='ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-medium text-primary-foreground'>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className='border-t p-2'>
            <nav className='grid gap-1'>
              <Link
                to='/admin/dashboard/settings/profile'
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  location.pathname === '/admin/dashboard/settings/profile'
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <Settings className='h-5 w-5' />
                <span>Settings</span>
              </Link>
            </nav>
            <div className='px-3 py-2 text-sm text-muted-foreground'>
              Signed in as .............
              {/* {session?.user?.email} */}
            </div>
            <Button
              variant='ghost'
              className='w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              //   onClick={handleSignOut}
            >
              <LogOut className='h-5 w-5' />
              <span>Sign out</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/dashboard/users', icon: Users, badge: '3' },
  { name: 'LLM', href: '/admin/dashboard/llm', icon: BarChart3, badge: '3' },
];
