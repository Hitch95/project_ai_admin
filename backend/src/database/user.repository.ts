import { User } from '../types/user';
import { db } from './index'; // instance mysql2/promise

export async function getUserById(id: number): Promise<User | null> {
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return (rows as User[])[0] || null;
}