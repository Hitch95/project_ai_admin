import type { User } from '@/utils/types/user';

const backendUrl =
  import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000';

export const usersApi = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${backendUrl}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status : ${response.status}`);
      }

      const users = await response.json();
      console.log('Users : ', users);
      return users;
    } catch (error) {
      console.error('Error fetching users : ', error);
      throw error;
    }
  },

  async getUser(id: number): Promise<User> {
    const users = await this.getUsers();
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  async createUser(user: Partial<User>): Promise<User> {
    const response = await fetch(`${backendUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const response = await fetch(`${backendUrl}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  },

  // Dans users.ts API
  async promoteToAdmin(userId: number): Promise<void> {
    try {
      // 1. Récupérer le user de la table "users"
      const user = await this.getUser(userId);

      // 2. Créer l'admin dans Better-Auth via ton endpoint
      const response = await fetch(`${backendUrl}/api/auth/sign-up/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: 'temp-admin-password', // Ou générer un password
        }),
      });

      if (!response.ok) throw new Error('Failed to create admin');
      console.log(`User ${user.email} promoted to admin in Better-Auth table`);
    } catch (error) {
      console.error('Failed to promote user to admin:', error);
      throw error;
    }
  },

  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${backendUrl}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  },
};
