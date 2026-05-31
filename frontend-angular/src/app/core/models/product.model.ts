export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
  products?: Product[];
  _count?: {
    products: number;
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  originalPrice?: number;
  unit: string;
  stock: number;
  sku?: string;
  isFeatured: boolean;
  isActive: boolean;
  viewCount: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  category?: Category;
  images?: ProductImage[];
  reviews?: Review[];
  _count?: {
    reviews?: number;
    orderItems?: number;
  };
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: {
    id: string;
    fullName: string;
    avatar?: string;
  };
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  success: boolean;
  products?: T[];
  categories?: T[];
  orders?: T[];
  users?: T[];
  faqs?: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
