export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role: 'ADMIN' | 'USER';
  status: 'ACTIVE' | 'INACTIVE' | 'LOCKED';
  createdAt: string;
  updatedAt?: string;
  _count?: {
    orders?: number;
    carts?: number;
  };
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}
