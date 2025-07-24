'use client';

import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';

import useAuth from '@/utils/hooks/useAuth';

const LoginUiComponent = () => {
  // useStates
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.data && result.data.user) {
        window.location.href = '/admin/dashboard';
      } else {
        setError(result.error?.message || 'Authentication failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-[#23272f] text-black relative overflow-hidden w-full rounded-xl bg-gray-200'>
      {/* Centered glass card */}
      <div className='relative z-10 w-full max-w-sm rounded-3xl bg-[#23272f] shadow-2xl p-8 flex flex-col items-center text-white'>
        {/* Logo */}
        <div className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 mb-6 shadow-lg'>
          <img src='/Ai_Icon.svg' className='w-8 h-8' />
        </div>
        {/* Title */}
        <h2 className='text-2xl font-semibold text-white mb-6 text-center'>
          AIfactory.
        </h2>

        {loading ? (
          <div className='flex items-center gap-3'>
            <Spinner size={'medium'}>Loading...</Spinner>
          </div>
        ) : (
          /* Form */
          <div className='flex flex-col w-full gap-4'>
            <div className='w-full flex flex-col gap-3'>
              <input
                placeholder='Email'
                type='email'
                value={email}
                autoComplete='email'
                className='w-full px-5 py-3 rounded-xl  bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400'
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder='Password'
                type='password'
                value={password}
                autoComplete='current-password'
                className='w-full px-5 py-3 rounded-xl  bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400'
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <div className='text-sm text-red-400 text-left'>{error}</div>
              )}
            </div>
            <hr className='opacity-10' />
            <div>
              <button
                onClick={handleSignIn}
                className='w-full bg-white/10 text-white font-medium px-5 py-3 rounded-full shadow hover:bg-white/20 transition mb-3  text-sm cursor-pointer'
              >
                Sign in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { LoginUiComponent };
