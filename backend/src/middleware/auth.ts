import { Request, Response, NextFunction } from 'express';
import { auth } from '../utils/auth.js';

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log('\n🔒 === REQUIRE AUTH MIDDLEWARE DEBUG ===');
  // console.log('📍 Route:', req.method, req.path);
  // console.log('🍪 Raw Cookie Header:', req.headers.cookie || 'NONE');
  // console.log('🌐 Origin:', req.headers.origin || 'NONE');
  // console.log('🔗 Referer:', req.headers.referer || 'NONE');

  try {
    // console.log('🚀 Calling auth.api.getSession...');

    const session = await auth.api.getSession({
      headers: {
        cookie: req.headers.cookie,
      } as any,
    });
    // console.log('📤 Better-Auth getSession result:', {
    //   hasSession: !!session,
    //   hasUser: !!session?.user,
    //   userId: session?.user?.id || 'NONE',
    //   isAdmin: session?.user?.is_admin || false,
    // });

    if (!session) {
      // console.error('❌ No session found - returning 401');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // console.log('✅ Session found for user:', session.user.id);

    // Verify if the user is an admin
    if (!session.user.is_admin) {
      console.error('❌ User is not admin - returning 403');
      return res.status(403).json({ error: 'Admin access required' });
    }

    // console.log('✅ User is admin - access granted');
    req.user = session.user;
    // console.log('🔒 === END REQUIRE AUTH DEBUG ===\n');
    next();
  } catch (error: unknown) {
    console.error('❌ Error in requireAuth middleware:', error);
    console.error('Error details:', {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack?.split('\n')[0],
    });
    console.error('🔒 === END REQUIRE AUTH DEBUG (ERROR) ===\n');
    return res.status(401).json({ error: 'Invalid session' });
  }
};
