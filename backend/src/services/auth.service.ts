import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword, generateToken } from '../utils/helpers';
import { Role, UserStatus } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthService {
  async register(data: { email: string; password: string; fullName: string; phone?: string }) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw { status: 400, message: 'Email đã được đăng ký' };
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        phone: data.phone,
        role: Role.USER,
        status: UserStatus.ACTIVE,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw { status: 401, message: 'Email hoặc mật khẩu không đúng' };
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw { status: 401, message: 'Email hoặc mật khẩu không đúng' };
    }

    if (user.status === UserStatus.LOCKED) {
      throw { status: 403, message: 'Tài khoản đã bị khóa' };
    }
    if (user.status === UserStatus.INACTIVE) {
      throw { status: 403, message: 'Tài khoản đã bị vô hiệu hóa' };
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        address: user.address,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        address: true,
        avatar: true,
        role: true,
        status: true,
        createdAt: true,
        _count: {
          select: { orders: true },
        },
      },
    });
    if (!user) {
      throw { status: 404, message: 'Không tìm thấy người dùng' };
    }
    return user;
  }

  async updateProfile(userId: string, data: { fullName?: string; phone?: string; address?: string }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        address: true,
        avatar: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw { status: 404, message: 'Không tìm thấy người dùng' };
    }

    const isValidPassword = await comparePassword(oldPassword, user.password);
    if (!isValidPassword) {
      throw { status: 400, message: 'Mật khẩu cũ không đúng' };
    }

    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Đổi mật khẩu thành công' };
  }
}

export const authService = new AuthService();
