import { Request, Response } from 'express';
import { auth } from '../utils/auth.js';

// Exemple de route login Express avec Better Auth (returnHeaders)
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Utilise Better Auth pour authentifier et récupérer les headers de session
    const response = await auth.api.signInEmail({
      body: { email, password },
      returnHeaders: true,
      asResponse: true,
    });

    // Récupère les headers
    Object.entries(response.headers || {}).forEach(([key, value]) => {
      res.setHeader(key, value as string);
    });

    // Parse le body pour obtenir data/error
    const result = await response.json();

    if (result.error || !result.user) {
      return res
        .status(401)
        .json({ error: result.error?.message || 'Authentication failed.' });
    }

    // Renvoie la session ou redirige
    return res.json({ user: result.user });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
