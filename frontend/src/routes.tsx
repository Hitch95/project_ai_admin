import type React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { DashboardLayout } from '@/lib/ui/dashboard-layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login/Login';
import User from '@/pages/Users/Users';
import UserDetail from '@/pages/Users/UserDetail';
import Llm from '@/pages/Llm/Llm';
import LlmDetail from '@/pages/Llm/LlmDetail';
import ProfileSettings from './pages/Settings/Profile';

// Hook pour vérifier l'authentification (à adapter selon ton système)
// function useAuth() {
//   // Remplace par ta logique d'auth (localStorage, context, etc.)
//   const token = localStorage.getItem('authToken');
//   return { isAuthenticated: !!token, isLoading: false };
// }

// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   // const { isAuthenticated, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className='flex items-center justify-center min-h-screen'>
//         Loading...
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to='/login' replace />;
//   }

//   return <>{children}</>;
// }

function PublicRoute({ children }: { children: React.ReactNode }) {
  // const { isAuthenticated, isLoading } = useAuth();

  // if (isLoading) {
  //   return (
  //     <div className='flex items-center justify-center min-h-screen'>
  //       Loading...
  //     </div>
  //   );
  // }

  // if (isAuthenticated) {
  //   return <Navigate to='/admin/dashboard' replace />;
  // }

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
          // <ProtectedRoute>
          <DashboardLayout />
          // </ProtectedRoute>
        }
      >
        {/* Dashboard home page */}
        <Route index element={<Home />} />
        <Route path='users' element={<User />} />
        <Route path='user/:id' element={<UserDetail />} />
        <Route path='llm' element={<Llm />} />
        <Route path='llm/:id' element={<LlmDetail />} />
        <Route path='settings/profile' element={<ProfileSettings />} />
      </Route>

      {/* Catch all route - redirect to login */}
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
}
