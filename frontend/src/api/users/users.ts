import type { User } from '@/types/user';

// Mock API for development - replace with your actual backend endpoints
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const usersApi = {
  async getUsers(): Promise<User[]> {
    // Mock data based on your database schema
    return [
      {
        id: 1,
        name: 'Bahloul Admin',
        email: 'bahloul.admin@example.com',
        email_verified_at: new Date().toISOString(),
        password:
          '$2b$10$MiEB6D/rxPQl0dKYNng7/Oag4AIJ.0Lrl4YlwWXE97vu6APtEzgAy',
        remember_token: null,
        is_admin: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'Guillaume Admin',
        email: 'guillaume.admin@example.com',
        email_verified_at: new Date().toISOString(),
        password:
          '$2b$10$MiEB6D/rxPQl0dKYNng7/Oag4AIJ.0Lrl4YlwWXE97vu6APtEzgAy',
        remember_token: null,
        is_admin: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 3,
        name: 'Dan User',
        email: 'dan.user@example.com',
        email_verified_at: new Date().toISOString(),
        password:
          '$2b$10$54h6CgJXjtSPHeYUhpZk7OOuc.MSn64w4F0TDJ1FKl0JwJeHR7uJS',
        remember_token: null,
        is_admin: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
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
    // In real implementation, this would call your backend
    const response = await fetch(`${API_BASE}/users`, {
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
    const response = await fetch(`${API_BASE}/users/${id}`, {
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

  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  },
};
