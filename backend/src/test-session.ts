import type { Request, Response } from 'express';
import { auth } from './utils/auth.js';

export const testSessionHandler = async (req: Request, res: Response) => {
  console.log('\n🧪 === TEST SESSION ENDPOINT ===');
  console.log('🍪 Cookies received:', req.headers.cookie || 'NONE');
  console.log('🌐 Origin:', req.headers.origin || 'NONE');
  console.log('🔗 Referer:', req.headers.referer || 'NONE');

  try {
    // Test avec Better-Auth
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    console.log('📤 Session result:', {
      hasSession: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id,
      userEmail: session?.user?.email,
    });

    res.json({
      success: true,
      hasSession: !!session,
      session: session
        ? {
            userId: session.user?.id,
            userEmail: session.user?.email,
            isAdmin: session.user?.is_admin,
          }
        : null,
      cookies: req.headers.cookie || 'none',
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    console.error('❌ Test session error:', error);
    res.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      cookies: req.headers.cookie || 'none',
    });
  }

  console.log('🧪 === END TEST SESSION ===\n');
};
