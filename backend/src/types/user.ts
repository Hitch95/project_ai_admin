// Interface pour Laravel/Sequelize (table users)
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  rememberToken?: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Better-Auth (user)
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}

// Extension Express
declare global {
  namespace Express {
    interface Request {
      user?: AdminUser;
    }
  }
}
