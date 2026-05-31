import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SETTINGS_ID = 'default';

const defaultSettings = {
  id: SETTINGS_ID,
  siteName: 'WebBanHoaQua',
  contactEmail: 'contact@webbanhoaqua.com',
  contactPhone: '0909.123.456',
  address: '123 Đường Nông Sản, Quận 1, TP.HCM',
  businessHours: '7:00 - 21:00 (Thứ 2 - CN)',
};

export class SettingService {
  async getSettings() {
    return prisma.systemSetting.upsert({
      where: { id: SETTINGS_ID },
      update: {},
      create: defaultSettings,
    });
  }

  async updateSettings(data: {
    siteName?: string;
    contactEmail?: string | null;
    contactPhone?: string | null;
    address?: string | null;
    businessHours?: string | null;
  }) {
    const payload: any = {};
    const allowedFields = ['siteName', 'contactEmail', 'contactPhone', 'address', 'businessHours'];

    for (const field of allowedFields) {
      const value = (data as any)[field];
      if (value !== undefined) {
        payload[field] = typeof value === 'string' ? value.trim() : value;
      }
    }

    if (!payload.siteName && data.siteName !== undefined) {
      throw { status: 400, message: 'Tên website không được để trống' };
    }

    return prisma.systemSetting.upsert({
      where: { id: SETTINGS_ID },
      update: payload,
      create: { ...defaultSettings, ...payload },
    });
  }
}

export const settingService = new SettingService();
