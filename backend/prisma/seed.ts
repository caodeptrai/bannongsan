import { PrismaClient, Role, OrderStatus, PaymentStatus, PaymentMethod, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // ===================== CLEAN EXISTING DATA =====================
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.review.deleteMany();
  await prisma.chatbotFAQ.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleaned existing data');

  // ===================== CREATE USERS =====================
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      fullName: 'Quản Trị Viên',
      phone: '0900000001',
      address: '123 Đường Admin, Quận 1, TP.HCM',
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    }
  });

  // User accounts
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'user1@example.com',
        password: hashedPassword,
        fullName: 'Nguyễn Văn An',
        phone: '0901234567',
        address: '45 Lê Lợi, Quận 1, TP.HCM',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user2@example.com',
        password: hashedPassword,
        fullName: 'Trần Thị Bình',
        phone: '0902345678',
        address: '78 Nguyễn Huệ, Quận 1, TP.HCM',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user3@example.com',
        password: hashedPassword,
        fullName: 'Lê Minh Cường',
        phone: '0903456789',
        address: '12 Trần Hưng Đạo, Quận 5, TP.HCM',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user4@example.com',
        password: hashedPassword,
        fullName: 'Phạm Thị Dung',
        phone: '0904567890',
        address: '56 Cái Khế, Quận Ninh Kiều, Cần Thơ',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user5@example.com',
        password: hashedPassword,
        fullName: 'Hoàng Văn Em',
        phone: '0905678901',
        address: '89 Lê Duẩn, Quận Hải Châu, Đà Nẵng',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user6@example.com',
        password: hashedPassword,
        fullName: 'Võ Thị Françoise',
        phone: '0906789012',
        address: '34 Trần Phú, Quận Hàm Tiến, Phan Thiết',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user7@example.com',
        password: hashedPassword,
        fullName: 'Đặng Minh Giang',
        phone: '0907890123',
        address: '67 Lý Thường Kiệt, Quận 11, TP.HCM',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user8@example.com',
        password: hashedPassword,
        fullName: 'Bùi Thị Hương',
        phone: '0908901234',
        address: '23 Nguyễn Đình Chiểu, Quận 3, TP.HCM',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user9@example.com',
        password: hashedPassword,
        fullName: 'Trịnh Văn Is',
        phone: '0909012345',
        address: '91 Võ Văn Tần, Quận 3, TP.HCM',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user10@example.com',
        password: hashedPassword,
        fullName: 'Ngô Thị Julie',
        phone: '0910123456',
        address: '55 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user11@example.com',
        password: hashedPassword,
        fullName: 'Phan Văn Khải',
        phone: '0911234567',
        address: '82 Sư Vạn Hạnh, Quận 10, TP.HCM',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user12@example.com',
        password: hashedPassword,
        fullName: 'Trần Thị Lam',
        phone: '0912345678',
        address: '18 Bà Hạt, Quận 10, TP.HCM',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user13@example.com',
        password: hashedPassword,
        fullName: 'Lý Văn Minh',
        phone: '0913456789',
        address: '41 Hoàng Sa, Quận 3, TP.HCM',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user14@example.com',
        password: hashedPassword,
        fullName: 'Châu Thị Nga',
        phone: '0914567890',
        address: '76 Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
    prisma.user.create({
      data: {
        email: 'user15@example.com',
        password: hashedPassword,
        fullName: 'Đỗ Văn Phong',
        phone: '0915678901',
        address: '29 Trần Cao Vân, Quận Thanh Khê, Đà Nẵng',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      }
    }),
  ]);

  console.log(`✅ Created ${1 + users.length} users`);

  // ===================== CREATE CATEGORIES =====================
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Trái Cây Tươi',
        slug: 'trai-cay-tuoi',
        description: 'Các loại trái cây tươi ngon, đảm bảo chất lượng, được nhập trực tiếp từ vườn.',
        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400',
        sortOrder: 1,
      }
    }),
    prisma.category.create({
      data: {
        name: 'Rau Củ Quả',
        slug: 'rau-cu-qua',
        description: 'Rau củ quả sạch, an toàn, được trồng theo phương pháp hữu cơ.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
        sortOrder: 2,
      }
    }),
    prisma.category.create({
      data: {
        name: 'Trái Cây Nhập Khẩu',
        slug: 'trai-cay-nhap-khau',
        description: 'Các loại trái cây nhập khẩu cao cấp từ các nước trên thế giới.',
        image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400',
        sortOrder: 3,
      }
    }),
    prisma.category.create({
      data: {
        name: 'Nông Sản Khô',
        slug: 'nong-san-kho',
        description: 'Các loại nông sản khô, hạt, ngũ cốc, gia vị.',
        image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=400',
        sortOrder: 4,
      }
    }),
    prisma.category.create({
      data: {
        name: 'Thực Phẩm Chế Biến',
        slug: 'thuc-pham-che-bien',
        description: 'Các sản phẩm thực phẩm chế biến từ nông sản tươi ngon.',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400',
        sortOrder: 5,
      }
    }),
    prisma.category.create({
      data: {
        name: 'Đặc Sản Vùng Miền',
        slug: 'dac-san-vung-mien',
        description: 'Các đặc sản nông sản nổi tiếng từ khắp các vùng miền Việt Nam.',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400',
        sortOrder: 6,
      }
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // ===================== CREATE PRODUCTS =====================
  const products = await Promise.all([
    // Category 1: Trái Cây Tươi
    prisma.product.create({
      data: {
        name: 'Xoài Cát Hòa Lộc',
        slug: 'xoai-cat-hoa-loc',
        description: 'Xoài Cát Hòa Lộc là giống xoài đặc sản nổi tiếng miền Nam Việt Nam, có vị ngọt thơm, thịt quả vàng óng, mềm mại. Được trồng tại vùng đất phù sa ven sông Mekong, đảm bảo chất lượng và hương vị đặc trưng.',
        price: 65000,
        originalPrice: 75000,
        unit: 'kg',
        stock: 150,
        sku: 'XQH-001',
        isFeatured: true,
        isActive: true,
        viewCount: 234,
        soldCount: 89,
        rating: 4.8,
        reviewCount: 45,
        categoryId: categories[0].id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Cam Valencia',
        slug: 'cam-valencia',
        description: 'Cam Valencia có vị ngọt thanh, nhiều nước, giàu vitamin C. Quả cam Valencia có màu cam tươi rực rỡ, vỏ mỏng, tép cam mọng nước và rất thơm.',
        price: 45000,
        originalPrice: null,
        unit: 'kg',
        stock: 200,
        sku: 'CMV-002',
        isFeatured: true,
        isActive: true,
        viewCount: 189,
        soldCount: 67,
        rating: 4.6,
        reviewCount: 32,
        categoryId: categories[0].id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Bưởi Da Xanh',
        slug: 'buoi-da-xanh',
        description: 'Bưởi Da Xanh Bến Tre nổi tiếng với vỏ xanh non, ruột hồng đỏ, vị ngọt thanh mát. Bưởi có tép giòn, mọng nước, giàu vitamin C và chất xơ.',
        price: 35000,
        originalPrice: 40000,
        unit: 'kg',
        stock: 120,
        sku: 'BDX-003',
        isFeatured: true,
        isActive: true,
        viewCount: 312,
        soldCount: 123,
        rating: 4.9,
        reviewCount: 67,
        categoryId: categories[0].id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Nhãn Lồng Hưng Yên',
        slug: 'nhan-long-hung-yen',
        description: 'Nhãn Lồng Hưng Yên là đặc sản nổi tiếng với quả tròn, lớp vỏ mỏng, múi nhãn trắng trong, ngọt lịm. Được thu hoạch từ vùng nhãn lồng truyền thống Hưng Yên.',
        price: 55000,
        originalPrice: null,
        unit: 'kg',
        stock: 80,
        sku: 'NLH-004',
        isFeatured: false,
        isActive: true,
        viewCount: 156,
        soldCount: 45,
        rating: 4.7,
        reviewCount: 28,
        categoryId: categories[0].id,
      }
    }),

    // Category 2: Rau Củ Quả
    prisma.product.create({
      data: {
        name: 'Cà Chua Đà Lạt',
        slug: 'ca-chua-da-lat',
        description: 'Cà chua Đà Lạt được trồng ở độ cao 1500m, khí hậu mát mẻ quanh năm. Quả cà chua chín đỏ mọng, vị ngọt thanh, giòn tan, giàu lycopene và vitamin.',
        price: 25000,
        originalPrice: null,
        unit: 'kg',
        stock: 300,
        sku: 'CCD-005',
        isFeatured: false,
        isActive: true,
        viewCount: 98,
        soldCount: 34,
        rating: 4.5,
        reviewCount: 19,
        categoryId: categories[1].id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Rau Muống Sạch',
        slug: 'rau-muong-sach',
        description: 'Rau muống sạch được trồng thủy canh trong nhà kính, không sử dụng thuốc trừ sâu. Lá xanh non, thân giòn, ngọt mát, đảm bảo ATVSTP.',
        price: 18000,
        originalPrice: 20000,
        unit: 'bó',
        stock: 100,
        sku: 'RMS-006',
        isFeatured: true,
        isActive: true,
        viewCount: 145,
        soldCount: 78,
        rating: 4.4,
        reviewCount: 41,
        categoryId: categories[1].id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Khoai Lang Nhật',
        slug: 'khoai-lang-nhat',
        description: 'Khoai lang Nhật (khoai lang tím) có vỏ tím, ruột vàng cam. Vị ngọt bùi, giàu tinh bột, chất xơ, vitamin A và beta-carotene. Rất tốt cho sức khỏe.',
        price: 30000,
        originalPrice: null,
        unit: 'kg',
        stock: 180,
        sku: 'KLN-007',
        isFeatured: false,
        isActive: true,
        viewCount: 87,
        soldCount: 23,
        rating: 4.6,
        reviewCount: 15,
        categoryId: categories[1].id,
      }
    }),

    // Category 3: Trái Cây Nhập Khẩu
    prisma.product.create({
      data: {
        name: 'Cherry New Zealand',
        slug: 'cherry-new-zealand',
        description: 'Cherry New Zealand nhập khẩu trực tiếp, quả to tròn, màu đỏ đậm ruby. Vị ngọt thanh, giòn tan, giàu chất chống oxy hóa, melatonin và vitamin C.',
        price: 320000,
        originalPrice: 380000,
        unit: 'kg',
        stock: 30,
        sku: 'CNZ-008',
        isFeatured: true,
        isActive: true,
        viewCount: 456,
        soldCount: 34,
        rating: 4.9,
        reviewCount: 56,
        categoryId: categories[2].id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Táo Envy New Zealand',
        slug: 'tao-envy-new-zealand',
        description: 'Táo Envy có hình dạng đẹp mắt, vỏ đỏ bóng, thịt trắng giòn, vị ngọt đậm đà. Được trồng theo tiêu chuẩn GlobalGAP, đảm bảo chất lượng xuất khẩu.',
        price: 180000,
        originalPrice: 220000,
        unit: 'kg',
        stock: 50,
        sku: 'TEN-009',
        isFeatured: true,
        isActive: true,
        viewCount: 389,
        soldCount: 45,
        rating: 4.8,
        reviewCount: 43,
        categoryId: categories[2].id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Nho Đen Black Magic',
        slug: 'nho-den-black-magic',
        description: 'Nho Đen Black Magic Tây Ban Nha, quả mọng, vỏ mỏng màu đen ánh, vị ngọt thơm. Giàu resveratrol, chất chống lão hóa tự nhiên.',
        price: 250000,
        originalPrice: null,
        unit: 'kg',
        stock: 25,
        sku: 'NDM-010',
        isFeatured: false,
        isActive: true,
        viewCount: 234,
        soldCount: 12,
        rating: 4.7,
        reviewCount: 21,
        categoryId: categories[2].id,
      }
    }),

    // Category 4: Nông Sản Khô
    prisma.product.create({
      data: {
        name: 'Gạo ST25 Ông Cua',
        slug: 'gao-st25-ong-cua',
        description: 'Gạo ST25 Ông Cua - Top 3 gạo ngon nhất thế giới 2023. Hạt gạo dài, trắng mềm, nở đều, vị ngọt tự nhiên. Đặc biệt thơm khi nấu, phù hợp cơm trắng và nhiều món ăn.',
        price: 85000,
        originalPrice: 95000,
        unit: 'kg',
        stock: 250,
        sku: 'GST-011',
        isFeatured: true,
        isActive: true,
        viewCount: 567,
        soldCount: 234,
        rating: 5.0,
        reviewCount: 123,
        categoryId: categories[3].id,
      }
    }),
    prisma.product.create({
      data: {
        name: 'Đậu Phộng Rang Muối',
        slug: 'dau-phong-rang-muoi',
        description: 'Đậu phộng rang muối Bạc Liêu, hạt to đều, rang giòn vàng, rắc muối vừa phải. Đậu phộng giàu protein, chất béo tốt, là món ăn vặt lành mạnh.',
        price: 65000,
        originalPrice: null,
        unit: 'kg',
        stock: 100,
        sku: 'DPM-012',
        isFeatured: false,
        isActive: true,
        viewCount: 178,
        soldCount: 56,
        rating: 4.6,
        reviewCount: 34,
        categoryId: categories[3].id,
      }
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // ===================== CREATE PRODUCT IMAGES =====================
  const productImages = [
    { productId: products[0].id, url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600', altText: 'Xoài Cát Hòa Lộc', isPrimary: true },
    { productId: products[0].id, url: 'https://images.unsplash.com/photo-1561374618-abb7f4a2f9f2?w=600', altText: 'Xoài Hòa Lộc', isPrimary: false },
    { productId: products[1].id, url: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600', altText: 'Cam Valencia', isPrimary: true },
    { productId: products[2].id, url: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=600', altText: 'Bưởi Da Xanh', isPrimary: true },
    { productId: products[3].id, url: 'https://images.unsplash.com/photo-1597160558498-a8d6b90f5c8e?w=600', altText: 'Nhãn Lồng Hưng Yên', isPrimary: true },
    { productId: products[4].id, url: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600', altText: 'Cà Chua Đà Lạt', isPrimary: true },
    { productId: products[5].id, url: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=600', altText: 'Rau Muống Sạch', isPrimary: true },
    { productId: products[6].id, url: 'https://images.unsplash.com/photo-1583225194233-2f2c2a565d28?w=600', altText: 'Khoai Lang Nhật', isPrimary: true },
    { productId: products[7].id, url: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=600', altText: 'Cherry New Zealand', isPrimary: true },
    { productId: products[8].id, url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600', altText: 'Táo Envy', isPrimary: true },
    { productId: products[9].id, url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600', altText: 'Nho Đen Black Magic', isPrimary: true },
    { productId: products[10].id, url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600', altText: 'Gạo ST25', isPrimary: true },
    { productId: products[11].id, url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600', altText: 'Đậu Phộng Rang Muối', isPrimary: true },
  ];

  for (const img of productImages) {
    await prisma.productImage.create({ data: img });
  }

  console.log(`✅ Created ${productImages.length} product images`);

  // ===================== CREATE ORDERS =====================
  const orderStatuses: OrderStatus[] = [OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.SHIPPING, OrderStatus.COMPLETED, OrderStatus.CANCELLED];
  const paymentStatuses: PaymentStatus[] = [PaymentStatus.PENDING, PaymentStatus.PAID, PaymentStatus.PAID, PaymentStatus.PAID, PaymentStatus.REFUNDED];

  const orders = [];
  for (let i = 0; i < 15; i++) {
    const user = users[i % users.length];
    const statusIndex = i % 5;
    const status = orderStatuses[statusIndex];
    const paymentStatus = paymentStatuses[statusIndex];
    const items = products.slice(0, Math.floor(Math.random() * 3) + 1);
    const subtotal = items.reduce((sum, p) => sum + Number(p.price) * (Math.floor(Math.random() * 3) + 1), 0);
    const shippingFee = subtotal >= 200000 ? 0 : 25000;
    const discount = subtotal >= 500000 ? subtotal * 0.05 : 0;
    const total = subtotal + shippingFee - discount;

    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD${String(i + 1).padStart(6, '0')}`,
        userId: user.id,
        status,
        subtotal,
        shippingFee,
        discount,
        total,
        shippingName: user.fullName,
        shippingPhone: user.phone!,
        shippingAddress: user.address!,
        paymentMethod: PaymentMethod.COD,
        paymentStatus,
        confirmedAt: statusIndex >= 1 ? new Date(Date.now() - (15 - i) * 86400000) : null,
        shippedAt: statusIndex >= 2 ? new Date(Date.now() - (15 - i) * 86400000 + 86400000) : null,
        completedAt: statusIndex === 3 ? new Date(Date.now() - (15 - i) * 86400000 + 172800000) : null,
        cancelledAt: statusIndex === 4 ? new Date(Date.now() - (15 - i) * 86400000) : null,
        cancelReason: statusIndex === 4 ? 'Khách hàng hủy đơn' : null,
      }
    });

    orders.push(order);

    for (const product of items) {
      const quantity = Math.floor(Math.random() * 3) + 1;
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          productName: product.name,
          productImage: `https://images.unsplash.com/photo-1553279768-865429fa0078?w=200`,
          quantity,
          price: Number(product.price),
          total: Number(product.price) * quantity,
        }
      });

      if (status === 'COMPLETED') {
        await prisma.product.update({
          where: { id: product.id },
          data: { soldCount: { increment: quantity } }
        });
      }
    }

    await prisma.payment.create({
      data: {
        orderId: order.id,
        method: PaymentMethod.COD,
        amount: total,
        status: paymentStatus,
        paidAt: statusIndex >= 3 ? new Date(Date.now() - (15 - i) * 86400000) : null,
      }
    });
  }

  console.log(`✅ Created ${orders.length} orders`);

  // ===================== CREATE CHATBOT FAQs =====================
  const faqs = [
    { question: 'cửa hàng mở cửa mấy giờ', answer: 'Cửa hàng WebBanHoaQua mở cửa từ 7h00 sáng đến 21h00 tối các ngày trong tuần, kể cả cuối tuần và ngày lễ.', keywords: 'giờ,mở cửa,thời gian,giờ mở cửa', category: 'general' },
    { question: 'số điện thoại liên hệ', answer: 'Quý khách có thể liên hệ cửa hàng qua số điện thoại: 0909.123.456 hoặc 028.1234.5678. Đội ngũ tư vấn sẵn sàng hỗ trợ 24/7.', keywords: 'điện thoại,phone,sdt,liên hệ,hotline', category: 'general' },
    { question: 'địa chỉ cửa hàng ở đâu', answer: 'Cửa hàng WebBanHoaQua tọa lạc tại: 123 Đường Nông Sản, Quận 1, TP.HCM. Quý khách có thể ghé thăm hoặc đặt hàng online với giao hàng tận nơi.', keywords: 'địa chỉ,đâu,ở đâu,location', category: 'general' },
    { question: 'có giao hàng không', answer: 'Có, chúng tôi cung cấp dịch vụ giao hàng tận nơi trong TP.HCM và các tỉnh thành lân cận. Phí ship từ 20.000đ - 50.000đ tùy khoảng cách. Đơn hàng từ 500.000đ được miễn phí giao hàng.', keywords: 'giao hàng,ship,delivery,vận chuyển', category: 'shipping' },
    { question: 'thời gian giao hàng bao lâu', answer: 'Thời gian giao hàng trong TP.HCM: 2-4 giờ. Các tỉnh thành khác: 1-3 ngày tùy khu vực. Đơn hàng đặt trước 12h sẽ được giao trong ngày.', keywords: 'thời gian giao,bao lâu,lâu,delivery time', category: 'shipping' },
    { question: 'chính sách đổi trả', answer: 'Chúng tôi chấp nhận đổi trả trong 24 giờ nếu sản phẩm không đúng như mô tả hoặc bị hư hỏng trong quá trình vận chuyển. Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng.', keywords: 'đổi trả,trả lại,hoàn tiền,return,refund', category: 'general' },
    { question: 'cách đặt hàng', answer: 'Để đặt hàng: 1) Chọn sản phẩm và thêm vào giỏ hàng. 2) Kiểm tra giỏ hàng và số lượng. 3) Điền thông tin giao hàng. 4) Xác nhận đặt hàng. Bạn sẽ nhận được email xác nhận ngay sau khi đặt thành công.', keywords: 'đặt hàng,cách,mua,hướng dẫn,order', category: 'order' },
    { question: 'tôi muốn mua xoài', answer: 'Chúng tôi có Xoài Cát Hòa Lộc đang được bán với giá 65.000đ/kg (giảm từ 75.000đ). Đây là đặc sản miền Nam với vị ngọt thơm, thịt vàng óng. Bạn muốn tôi thêm vào giỏ hàng không?', keywords: 'xoài,mua', category: 'product', productId: products[0].id },
    { question: 'còn bưởi da xanh không', answer: `Có! Bưởi Da Xanh Bến Tre đang còn hàng với số lượng 120kg. Giá hiện tại: 35.000đ/kg (giảm từ 40.000đ). Đây là sản phẩm nổi bật với vỏ xanh, ruột hồng đỏ, rất được khách hàng yêu thích.`, keywords: 'bưởi,còn,hàng,stock', category: 'product', productId: products[2].id },
    { question: 'sản phẩm nào rẻ nhất', answer: 'Trong danh mục hiện có, sản phẩm giá tốt nhất là Rau Muống Sạch với giá chỉ 18.000đ/bó. Tiếp theo là Cà Chua Đà Lạt 25.000đ/kg và Khoai Lang Nhật 30.000đ/kg.', keywords: 'rẻ,giá rẻ,cheap,thấp nhất', category: 'price' },
    { question: 'cherry bao nhiêu tiền', answer: 'Cherry New Zealand đang có giá 320.000đ/kg (giảm từ 380.000đ/kg). Đây là cherry nhập khẩu cao cấp, quả to tròn, màu đỏ ruby, vị ngọt thanh. Còn 30kg trong kho.', keywords: 'cherry,giá,tiền,price', category: 'product', productId: products[7].id },
    { question: 'gạo ST25 còn không', answer: `Còn hàng! Gạo ST25 Ông Cua - Top 3 gạo ngon nhất thế giới 2023, đang có giá 85.000đ/kg (giảm từ 95.000đ). Còn 250kg trong kho. Đây là sản phẩm bán chạy nhất với 234 đơn đã bán.`, keywords: 'gạo,ST25,còn,hàng', category: 'product', productId: products[10].id },
    { question: 'sản phẩm nào bán chạy nhất', answer: 'Sản phẩm bán chạy nhất là Gạo ST25 Ông Cua với 234 đơn đã bán và đánh giá 5 sao. Tiếp theo là Bưởi Da Xanh (123 đơn), Xoài Cát Hòa Lộc (89 đơn) và Cherry New Zealand (34 đơn).', keywords: 'bán chạy,hot,nổi tiếng,best seller,popular', category: 'product' },
    { question: 'có sản phẩm nào giảm giá không', answer: 'Hiện có nhiều sản phẩm đang giảm giá: Xoài Cát Hòa Lộc (-13%), Bưởi Da Xanh (-12.5%), Rau Muống Sạch (-10%), Cherry New Zealand (-16%), Táo Envy (-18%), Gạo ST25 (-10.5%).', keywords: 'giảm giá,khuуến mãi,khuyến mãi,sale,discount', category: 'price' },
    { question: 'tôi muốn mua trái cây nhập khẩu', answer: 'Chúng tôi có các loại trái cây nhập khẩu cao cấp: Cherry New Zealand (320.000đ/kg), Táo Envy New Zealand (180.000đ/kg), Nho Đen Black Magic Tây Ban Nha (250.000đ/kg). Tất cả đều có nguồn gốc rõ ràng và đảm bảo chất lượng.', keywords: 'nhập khẩu,trái cây,import', category: 'product' },
    { question: 'cách thanh toán', answer: 'Chúng tôi hỗ trợ nhiều hình thức thanh toán: 1) COD - Thanh toán khi nhận hàng. 2) Chuyển khoản ngân hàng. 3) Ví điện tử (MoMo, ZaloPay). Khách hàng có thể chọn phương thức phù hợp khi đặt hàng.', keywords: 'thanh toán,cách trả tiền,payment', category: 'general' },
    { question: 'làm sao theo dõi đơn hàng', answer: 'Sau khi đặt hàng thành công, bạn sẽ nhận được mã đơn hàng. Hãy đăng nhập vào tài khoản và vào mục "Lịch sử đơn hàng" để theo dõi trạng thái đơn hàng. Bạn cũng sẽ nhận được thông báo qua email khi đơn hàng thay đổi trạng thái.', keywords: 'theo dõi,tracking,đơn hàng,order status', category: 'order' },
  ];

  for (const faq of faqs) {
    await prisma.chatbotFAQ.create({
      data: {
        question: faq.question,
        answer: faq.answer,
        keywords: faq.keywords,
        category: faq.category,
        productId: (faq as any).productId || null,
        isActive: true,
        priority: Math.floor(Math.random() * 10),
      }
    });
  }

  console.log(`✅ Created ${faqs.length} chatbot FAQs`);

  console.log('\n🎉 Database seed completed successfully!');
  console.log('\n📋 Test accounts:');
  console.log('   Admin: admin@example.com / 123456');
  console.log('   User1: user1@example.com / 123456');
  console.log('   User2: user2@example.com / 123456');
  console.log('\n📦 Statistics:');
  console.log(`   Users: 16 (1 admin + 15 customers)`);
  console.log(`   Categories: ${categories.length}`);
  console.log(`   Products: ${products.length}`);
  console.log(`   Orders: ${orders.length}`);
  console.log(`   FAQs: ${faqs.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
