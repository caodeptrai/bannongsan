# 8. Kiến trúc Hệ thống

## 8.1 Tổng quan kiến trúc

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Browser   │  │    Web      │  │    REST     │  │   Local      │    │
│  │  (Chrome)   │  │   App       │  │   Client    │  │   Storage    │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION LAYER                             │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    Angular 17 Application                         │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │    │
│  │  │  Client   │  │  Admin    │  │  Shared   │  │  Layouts  │       │    │
│  │  │  Pages    │  │  Pages    │  │Components │  │           │       │    │
│  │  │           │  │           │  │           │  │           │       │    │
│  │  │ Home      │  │Dashboard  │  │Header     │  │ClientLayout│      │
│  │  │ Products  │  │Categories │  │Footer     │  │AdminLayout │      │
│  │  │ Product   │  │Products   │  │ProductCard│  │           │       │
│  │  │ Cart      │  │Orders     │  │Chatbot    │  │           │       │
│  │  │ Checkout  │  │Users      │  │Pagination │  │           │       │
│  │  │ Orders    │  │Statistics │  │Alerts     │  │           │       │
│  │  │ Profile   │  │           │  │           │  │           │       │
│  │  └──────────┘  └──────────┘  └──────────┘  └───────────┘       │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                  Core Services & Guards                          │    │
│  │  AuthService  │  CartService  │  ProductService  │  OrderService │    │
│  │  CategoryService │ ChatbotService │ UserService │ OrderService    │    │
│  │  AuthGuard  │  AdminGuard  │  JWTInterceptor │  RouteGuards   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ REST API
┌─────────────────────────────────────────────────────────────────────────┐
│                           API GATEWAY LAYER                             │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      Express.js REST API                          │    │
│  │  CORS │ JSON Parser │ JWT Auth │ Rate Limiter │ Validation       │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          BUSINESS LAYER                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  Routes   │  │Controllers│  │ Services  │  │ Middlewares│            │
│  │           │  │           │  │           │  │            │            │
│  │ auth/     │  │ AuthCtrl  │  │ AuthSvc   │  │ AuthJWT    │            │
│  │ products/ │  │ ProductCtrl│ │ ProductSvc│  │ Validation │            │
│  │ categories│  │ CategoryCtrl│ │CategorySvc│ │ ErrorHandler│            │
│  │ orders/   │  │ OrderCtrl │  │ OrderSvc  │  │ Upload     │            │
│  │ cart/     │  │ CartCtrl  │  │ CartSvc   │  │            │            │
│  │ chatbot/  │  │ ChatbotCtrl│ │ChatbotSvc │  │            │            │
│  │ users/    │  │ UserCtrl  │  │ UserSvc   │  │            │            │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            DATA LAYER                                   │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                      Prisma ORM                                   │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │    │
│  │  │ User     │  │ Category │  │ Product  │  │  Order   │         │    │
│  │  │ Model    │  │ Model    │  │ Model    │  │  Model   │         │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘         │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │    │
│  │  │  Cart    │  │  Payment │  │  Review  │  │ChatbotFAQ│         │    │
│  │  │ Model    │  │ Model    │  │ Model    │  │  Model   │         │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘         │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATABASE LAYER                                  │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                          MySQL 8.0                               │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │    │
│  │  │  users  │ │categories│ │products │ │ orders  │ │ payments │    │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘    │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │    │
│  │  │cart_items│ │order_items││reviews │ │chatbot_faqs││product_imgs│   │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

## 8.2 Cấu trúc thư mục Backend

```
backend/
├── src/
│   ├── configs/           # Cấu hình ứng dụng
│   │   └── index.ts
│   ├── controllers/       # Xử lý HTTP requests
│   │   ├── auth.controller.ts
│   │   ├── product.controller.ts
│   │   ├── category.controller.ts
│   │   ├── cart.controller.ts
│   │   ├── order.controller.ts
│   │   ├── user.controller.ts
│   │   └── chatbot.controller.ts
│   ├── services/          # Logic nghiệp vụ
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   ├── category.service.ts
│   │   ├── cart.service.ts
│   │   ├── order.service.ts
│   │   ├── user.service.ts
│   │   └── chatbot.service.ts
│   ├── routes/            # Định nghĩa routes
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── product.routes.ts
│   │   ├── category.routes.ts
│   │   ├── cart.routes.ts
│   │   ├── order.routes.ts
│   │   ├── user.routes.ts
│   │   └── chatbot.routes.ts
│   ├── middlewares/       # Middleware functions
│   │   ├── auth.ts
│   │   ├── upload.ts
│   │   └── errorHandler.ts
│   ├── validators/       # Validation rules
│   │   └── index.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   └── helpers.ts
│   ├── uploads/           # Thư mục upload
│   └── index.ts           # Entry point
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts           # Seed data
├── package.json
├── tsconfig.json
└── .env
```

## 8.3 Cấu trúc thư mục Frontend

```
frontend-angular/
├── src/
│   ├── app/
│   │   ├── core/                 # Core functionality
│   │   │   ├── models/          # Data models
│   │   │   ├── services/        # API services
│   │   │   ├── guards/          # Route guards
│   │   │   └── interceptors/    # HTTP interceptors
│   │   ├── shared/               # Shared module
│   │   │   ├── components/      # Reusable components
│   │   │   │   ├── header/
│   │   │   │   ├── footer/
│   │   │   │   ├── product-card/
│   │   │   │   └── chatbot/
│   │   │   └── pipes/           # Custom pipes
│   │   ├── layouts/             # Layout components
│   │   │   ├── client/         # Client layout
│   │   │   └── admin/          # Admin layout
│   │   ├── features/           # Feature modules
│   │   │   ├── home/          # Home page
│   │   │   ├── products/       # Products
│   │   │   ├── auth/          # Auth pages
│   │   │   ├── cart/          # Cart
│   │   │   ├── checkout/      # Checkout
│   │   │   ├── profile/       # Profile
│   │   │   ├── orders/        # Orders
│   │   │   └── admin/         # Admin modules
│   │   │       ├── dashboard/
│   │   │       ├── categories/
│   │   │       ├── products/
│   │   │       ├── orders/
│   │   │       ├── users/
│   │   │       └── statistics/
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/               # Static assets
│   ├── environments/        # Environment configs
│   ├── styles.scss          # Global styles
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
└── tsconfig.json
```

## 8.4 Data Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                        REQUEST FLOW                                    │
│                                                                       │
│  Browser ──▶ Angular HTTP ──▶ JWT Interceptor ──▶ Express Router    │
│                                           │                          │
│                                    Add Authorization                  │
│                                           │                          │
│                                    Express Routes                     │
│                                           │                          │
│                                    Controllers                       │
│                                           │                          │
│                                    Services (Business Logic)          │
│                                           │                          │
│                                    Prisma ORM                        │
│                                           │                          │
│                                    MySQL Database                     │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                        RESPONSE FLOW                                  │
│                                                                       │
│  Database ──▶ Prisma ──▶ Services ──▶ Controllers ──▶ Response JSON   │
│                                         │                            │
│                                   Error Handler                       │
│                                         │                            │
│                                   HTTP Status                        │
│                                         │                            │
│  Browser ◀── Angular Observable ◀── HTTP Response                   │
│                              │                                        │
│                        Update State                                   │
│                              │                                        │
│                        Re-render UI                                   │
└──────────────────────────────────────────────────────────────────────┘
```

## 8.5 Authentication Flow

```
┌────────────────────────────────────────────────────────────────────┐
│                      LOGIN SEQUENCE                                   │
│                                                                     │
│  1. User submits login form                                         │
│  2. Angular → POST /api/auth/login {email, password}               │
│  3. Server validates credentials                                     │
│  4. Server creates JWT:                                             │
│     payload = { id, email, role }                                   │
│     secret = JWT_SECRET                                             │
│     expiresIn = 7d                                                  │
│  5. Server returns { user, token }                                  │
│  6. Angular stores token in localStorage                            │
│  7. JWT Interceptor adds token to all subsequent requests            │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                      PROTECTED ROUTE                                  │
│                                                                     │
│  1. User navigates to /checkout                                    │
│  2. AuthGuard checks:                                              │
│     - Is token in localStorage?                                    │
│     - Is token valid? (not expired, correct signature)             │
│     - User role matches required role?                             │
│  3. If valid → Allow navigation                                    │
│  4. If invalid → Redirect to /login                               │
└────────────────────────────────────────────────────────────────────┘
```
