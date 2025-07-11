import { Request, Response, NextFunction } from 'express';
import { auth } from '../utils/auth';

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Vérifier que l'utilisateur est admin
    if (!session.user.is_admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = session.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid session' });
  }
};
