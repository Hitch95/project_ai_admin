import { Outlet } from 'react-router';
import { Sidebar } from '@/lib/ui/sidebar';
import { Header } from '@/lib/ui/header';
import { SidebarProvider } from '@/lib/ui/sidebar-provider';

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className='min-h-screen bg-background'>
        <Sidebar />
        <div className='lg:pl-72'>
          <Header />
          <main className='p-4 md:p-6 lg:p-8'>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
