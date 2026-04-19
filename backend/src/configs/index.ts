import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL || 'mysql://root:@localhost:3306/webbanhoaqua',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'banhoaqua_jwt_secret_key_2026',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  upload: {
    dir: process.env.UPLOAD_DIR || 'uploads',
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};
