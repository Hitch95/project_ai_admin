import type React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { Loader } from 'lucide-react';
import { DashboardLayout } from '@/lib/ui/dashboard-layout';

import Home from '@/pages/Home';
import Login from '@/pages/Login/Login';
import User from '@/pages/Users/Users';
import UserDetail from '@/pages/Users/UserDetail';
import Llm from '@/pages/Llm/Llms';
import LlmDetail from '@/pages/Llm/LlmDetail';
import LlmModels from '@/pages/LlmModels/LlmModels';
import LlmModelDetail from '@/pages/LlmModels/LlmModelDetail';
import ProfileSettings from './pages/Settings/Profile';
import useAuth from './utils/hooks/useAuth';
import SessionTestComponent from './components/SessionTestComponent';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const {
    isPending,
    user,
    isAuthenticated,
    session,
    sessionError,
    // refetchSession,
  } = useAuth();

  if (isPending) {
    console.log('Loading...');
    return (
      <>
        <Loader className='animate-spin mx-auto my-20 h-10 w-10 text-gray-500' />
      </>
    );
  }
  if (user) {
    console.log(user);
  }
  if (session) {
    console.log('Session : ', session);
  }
  if (sessionError) {
    console.error(`Error: ${sessionError.message}`);
    return <Navigate to='/login' replace />;
  }
  if (!isAuthenticated) {
    console.error('Not authenticated');
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isPending } = useAuth();

  if (isPending) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        Loading...
        <Loader className='animate-spin mx-auto my-20 h-10 w-10 text-gray-500' />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to='/admin/dashboard' replace />;
  }

  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Default route redirects to login */}
      <Route path='/' element={<Navigate to='/login' replace />} />

      {/* Public login route */}
      <Route
        path='/login'
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected admin routes */}
      <Route
        path='/admin/dashboard'
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard home page */}
        <Route
          index
          element={
            <>
              <Home />
              <SessionTestComponent />
            </>
          }
        />
        <Route path='users' element={<User />} />
        <Route path='user/:id' element={<UserDetail />} />
        <Route path='llms' element={<Llm />} />
        <Route path='llm/:id' element={<LlmDetail />} />
        <Route path='llm-models' element={<LlmModels />} />
        <Route path='llm-model/:id' element={<LlmModelDetail />} />
        <Route path='settings/profile' element={<ProfileSettings />} />
      </Route>

      {/* Catch all route - redirect to login */}
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
}
