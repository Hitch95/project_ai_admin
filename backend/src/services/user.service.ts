import crypto from 'crypto';
import bcrypt from 'bcrypt';

import db from '../models/index.js';

const { User, Llm } = db;

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  is_admin?: boolean;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  is_admin?: boolean;
}

class UserService {
  static async createUser(data: CreateUserData) {
    const { name, email, password, is_admin = false } = data;

    // Check if the email already exists in the db
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const rememberToken = crypto.randomBytes(20).toString('hex');

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      is_admin,
      remember_token: rememberToken,
    });

    const userResponse = user.toJSON();
    delete userResponse.password;
    return userResponse;
  }

  static async getUserById(id: string | number) {
    const userId = typeof id === 'string' ? parseInt(id, 10) : id;

    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }

    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const userData = user.toJSON();
    delete userData.password;
    return userData;
  }

  static async updateUser(id: string | number, data: UpdateUserData) {
    const { name, email, password, is_admin } = data;

    const userId = typeof id === 'string' ? parseInt(id, 10) : id;

    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    const updateData: any = {
      updated_at: new Date(),
    };

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (is_admin !== undefined) updateData.is_admin = is_admin;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await user.update(updateData);

    const updatedUser = user.toJSON();
    delete updatedUser.password;
    return updatedUser;
  }

  static async deleteUser(id: string | number) {
    const userId = typeof id === 'string' ? parseInt(id, 10) : id;

    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Delete all LLMs associated with the user
    // await Llm.destroy({ where: { user_id: userId } });

    // Delete the user
    await user.destroy();
  }

  static async getAllUsers() {
    const users = await User.findAll({
      attributes: { exclude: ['password', 'remember_token'] },
      order: [['created_at', 'DESC']],
    });

    return users;
  }
}

export default UserService;
