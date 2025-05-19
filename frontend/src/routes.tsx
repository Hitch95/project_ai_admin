import { Navigate } from 'react-router';

import User from './pages/Users/Users';
import UserDetail from './pages/Users/UserDetail';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Llm from './pages/Llm/Llm';
import LlmDetail from './pages/Llm/LlmDetail';
import Home from './pages/Home';

export const routes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Signup /> },
  { path: '/admin/dashboard', element: <Home /> },
  { path: '/admin/dashboard/users', element: <User /> },
  { path: '/admin/dashboard/user/:id', element: <UserDetail /> },
  { path: '/admin/dashboard/llm', element: <Llm /> },
  { path: '/admin/dashboard/llm/:id', element: <LlmDetail /> },
  { path: '/', element: <Navigate to='/login' replace /> },
];
