import db from '../models/index.ts';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const { User, Llm, Role } = db;

class UserService {
  static async createUser(data: { name: string; email: string; password: string; role: string }) {
    const { name, email, password, role } = data;

    // Vérifiez si le rôle existe
    const _role = await Role.findOne({ where: { name: role } });
    if (!_role) {
      throw new Error('Role not found');
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const rememberToken = crypto.randomBytes(20).toString('hex');

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role_id: _role.id,
      remember_token: rememberToken,
      created_at: new Date(),
      updated_at: new Date()
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      role: {
        id: _role.id,
        name: _role.name
      }
    };
  }

  static async getUserById(id) {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Role,
          attributes: ['id', 'name']
        }
      ]
    });
    if (!user) {
      throw new Error('User not found');
    }
  
    const userData = user.toJSON();
    console.log(userData)
    userData.subscription = (userData.SubscriptionUsers && userData.SubscriptionUsers.length > 0) ? userData.SubscriptionUsers[0].Subscription.subscription : null;
    delete userData.SubscriptionUsers;
    
    return userData;
  }
  
  

  static async updateUser(id, data) {
    const { name, email, password, role } = data;

    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    const _role = await Role.findOne({ where: { name: role } });
    if (!_role) {
      throw new Error('Role not found');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Incorrect password');
    }

    await user.update({
      name,
      email,
      role_id: _role.id,
      updated_at: new Date()
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      role: {
        id: _role.id,
        name: _role.name
      }
    };
  }
}

export default UserService;
