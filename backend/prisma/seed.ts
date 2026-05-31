import { PrismaClient, Role, OrderStatus, PaymentStatus, PaymentMethod, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('\n========== DATABASE SEED ==========\n');

  // ===================== CLEAN DATA =====================
  console.log('Cleaning existing data...');
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
  console.log('  Done.\n');

  // ===================== USERS =====================
  const hashedPassword = await bcrypt.hash('MatKhau123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@webbanhoaqua.com',
      password: hashedPassword,
      fullName: 'Quản Trị Viên',
      phone: '0909123456',
      address: '123 Đường Nông Sản, Quận 1, TP. Hồ Chí Minh',
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  const customers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'nguyen.van.an@email.com',
        password: hashedPassword,
        fullName: 'Nguyễn Văn An',
        phone: '0901234567',
        address: '45 Lê Lợi, Quận 1, TP. Hồ Chí Minh',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      },
    }),
    prisma.user.create({
      data: {
        email: 'tran.thi.binh@email.com',
        password: hashedPassword,
        fullName: 'Trần Thị Bình',
        phone: '0902345678',
        address: '78 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      },
    }),
    prisma.user.create({
      data: {
        email: 'le.minh.cuong@email.com',
        password: hashedPassword,
        fullName: 'Lê Minh Cường',
        phone: '0903456789',
        address: '12 Trần Hưng Đạo, Quận 5, TP. Hồ Chí Minh',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      },
    }),
    prisma.user.create({
      data: {
        email: 'pham.thi.dung@email.com',
        password: hashedPassword,
        fullName: 'Phạm Thị Dung',
        phone: '0904567890',
        address: '56 Cái Khế, Quận Ninh Kiều, TP. Cần Thơ',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      },
    }),
    prisma.user.create({
      data: {
        email: 'hoang.van.em@email.com',
        password: hashedPassword,
        fullName: 'Hoàng Văn Em',
        phone: '0905678901',
        address: '89 Lê Duẩn, Quận Hải Châu, TP. Đà Nẵng',
        role: Role.USER,
        status: UserStatus.ACTIVE,
      },
    }),
  ]);
  console.log(`  Created 1 admin + ${customers.length} customers`);

  // ===================== CATEGORIES =====================
  const allUsers = [admin, ...customers];

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Trái Cây Tươi',
        slug: 'trai-cay-tuoi',
        description: 'Các loại trái cây tươi ngon, đảm bảo chất lượng, được nhập trực tiếp từ vườn trồng. Cam kết 100% không chất bảo quản.',
        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80',
        sortOrder: 1,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Rau Củ Quả',
        slug: 'rau-cu-qua',
        description: 'Rau củ quả sạch, an toàn, được trồng theo phương pháp hữu cơ hoặc thủy canh. Đạt chứng nhận VietGAP.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
        sortOrder: 2,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Trái Cây Nhập Khẩu',
        slug: 'trai-cay-nhap-khau',
        description: 'Các loại trái cây nhập khẩu cao cấp từ New Zealand, Mỹ, Chile, Thái Lan. Đảm bảo nguồn gốc xuất xứ rõ ràng.',
        image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&q=80',
        sortOrder: 3,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Nông Sản Khô',
        slug: 'nong-san-kho',
        description: 'Các loại nông sản khô, hạt, ngũ cốc, gạo, đậu. Sản phẩm được sơ chế và đóng gói vệ sinh an toàn thực phẩm.',
        image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&q=80',
        sortOrder: 4,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Thực Phẩm Chế Biến',
        slug: 'thuc-pham-che-bien',
        description: 'Các sản phẩm thực phẩm chế biến từ nông sản tươi ngon: nước ép, mứt, đồ hộp, gia vị.',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80',
        sortOrder: 5,
        isActive: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Đặc Sản Vùng Miền',
        slug: 'dac-san-vung-mien',
        description: 'Các đặc sản nông sản nổi tiếng từ khắp các vùng miền Việt Nam: Mekong, Tây Nguyên, miền Trung.',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
        sortOrder: 6,
        isActive: true,
      },
    }),
  ]);
  console.log(`  Created ${categories.length} categories`);

  // ===================== PRODUCTS =====================
  const products = await Promise.all([
    // --- Trái Cây Tươi (4 sản phẩm) ---
    prisma.product.create({
      data: {
        name: 'Xoài Cát Hòa Lộc',
        slug: 'xoai-cat-hoa-loc',
        description: 'Xoài Cát Hòa Lộc là giống xoài đặc sản nổi tiếng miền Nam Việt Nam, có vị ngọt thơm đặc trưng, thịt quả vàng óng mềm mại. Được trồng tại vùng đất phù sa ven sông Mekong, đảm bảo chất lượng và hương vị không lẫn với bất kỳ giống xoài nào khác.',
        price: 65000,
        originalPrice: 75000,
        unit: 'kg',
        stock: 150,
        sku: 'TCT-001',
        isFeatured: true,
        isActive: true,
        viewCount: 342,
        soldCount: 127,
        rating: 4.8,
        reviewCount: 56,
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Cam Valencia',
        slug: 'cam-valencia',
        description: 'Cam Valencia có vị ngọt thanh, nhiều nước, giàu vitamin C. Quả cam có màu cam tươi rực rỡ, vỏ mỏng, tép cam mọng nước và rất thơm. Đặc biệt thích hợp ép nước hoặc ăn trực tiếp vào buổi sáng.',
        price: 45000,
        originalPrice: null,
        unit: 'kg',
        stock: 200,
        sku: 'TCT-002',
        isFeatured: true,
        isActive: true,
        viewCount: 256,
        soldCount: 98,
        rating: 4.6,
        reviewCount: 43,
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Bưởi Da Xanh Bến Tre',
        slug: 'buoi-da-xanh-ben-tre',
        description: 'Bưởi Da Xanh Bến Tre nổi tiếng với vỏ xanh non đặc trưng, ruột hồng đỏ rực rỡ, vị ngọt thanh mát. Tép bưởi giòn, mọng nước, giàu vitamin C, chất xơ và kali. Đây là loại trái cây rất tốt cho sức khỏe.',
        price: 35000,
        originalPrice: 40000,
        unit: 'kg',
        stock: 120,
        sku: 'TCT-003',
        isFeatured: true,
        isActive: true,
        viewCount: 421,
        soldCount: 189,
        rating: 4.9,
        reviewCount: 78,
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Nhãn Lồng Hưng Yên',
        slug: 'nhan-long-hung-yen',
        description: 'Nhãn Lồng Hưng Yên là đặc sản nổi tiếng khắp cả nước với quả tròn đều, lớp vỏ mỏng vàng óng, múi nhãn trắng trong hấp dẫn. Vị ngọt lịm, thơm nhẹ. Được thu hoạch từ vùng nhãn lồng truyền thống lâu đời tại Hưng Yên.',
        price: 55000,
        originalPrice: null,
        unit: 'kg',
        stock: 80,
        sku: 'TCT-004',
        isFeatured: false,
        isActive: true,
        viewCount: 198,
        soldCount: 67,
        rating: 4.7,
        reviewCount: 32,
        categoryId: categories[0].id,
      },
    }),

    // --- Rau Củ Quả (3 sản phẩm) ---
    prisma.product.create({
      data: {
        name: 'Cà Chua Đà Lạt',
        slug: 'ca-chua-da-lat',
        description: 'Cà chua Đà Lạt được trồng ở độ cao 1500m so với mực nước biển, khí hậu mát mẻ quanh năm. Quả cà chua chín đỏ mọng, vị ngọt thanh tự nhiên, giòn tan, giàu lycopene và vitamin C. Phù hợp cho món salad, nấu ăn hoặc ép nước.',
        price: 25000,
        originalPrice: null,
        unit: 'kg',
        stock: 300,
        sku: 'RCQ-001',
        isFeatured: false,
        isActive: true,
        viewCount: 134,
        soldCount: 45,
        rating: 4.5,
        reviewCount: 21,
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Rau Muống Thủy Canh',
        slug: 'rau-muong-thuy-canh',
        description: 'Rau muống được trồng thủy canh trong nhà kính, hoàn toàn không sử dụng thuốc trừ sâu hay phân bón hóa học. Lá xanh non, thân giòn, vị ngọt mát tự nhiên. Đạt tiêu chuẩn an toàn thực phẩm ATVSTP, rửa sạch là ăn ngay.',
        price: 18000,
        originalPrice: 22000,
        unit: 'bó',
        stock: 100,
        sku: 'RCQ-002',
        isFeatured: true,
        isActive: true,
        viewCount: 187,
        soldCount: 89,
        rating: 4.4,
        reviewCount: 38,
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Khoai Lang Nhật',
        slug: 'khoai-lang-nhat',
        description: 'Khoai lang Nhật (khoai lang tím) có vỏ tím đậm, ruột vàng cam óng ánh. Vị ngọt bùi dịu nhẹ, giàu tinh bột kháng, chất xơ, vitamin A và beta-carotene. Rất tốt cho hệ tiêu hóa và da dẻ. Có thể nướng, hấp hoặc nấu chè.',
        price: 30000,
        originalPrice: null,
        unit: 'kg',
        stock: 180,
        sku: 'RCQ-003',
        isFeatured: false,
        isActive: true,
        viewCount: 112,
        soldCount: 34,
        rating: 4.6,
        reviewCount: 17,
        categoryId: categories[1].id,
      },
    }),

    // --- Trái Cây Nhập Khẩu (3 sản phẩm) ---
    prisma.product.create({
      data: {
        name: 'Cherry New Zealand',
        slug: 'cherry-new-zealand',
        description: 'Cherry New Zealand nhập khẩu trực tiếp, quả to tròn đồng đều, màu đỏ đậm ruby sang trọng. Vị ngọt thanh đậm đà, giòn tan, giàu chất chống oxy hóa (anthocyanin), melatonin và vitamin C tự nhiên. Đây là loại trái cây cao cấp rất được ưa chuộng dịp Tết và lễ hội.',
        price: 320000,
        originalPrice: 380000,
        unit: 'kg',
        stock: 30,
        sku: 'TNK-001',
        isFeatured: true,
        isActive: true,
        viewCount: 523,
        soldCount: 42,
        rating: 4.9,
        reviewCount: 61,
        categoryId: categories[2].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Táo Envy New Zealand',
        slug: 'tao-envy-new-zealand',
        description: 'Táo Envy có hình dạng đẹp mắt, vỏ đỏ bóng mượt tự nhiên, thịt trắng giòn sần. Vị ngọt đậm đà, thơm nhẹ. Được trồng và đóng gói theo tiêu chuẩn GlobalGAP, đảm bảo chất lượng xuất khẩu. Đặc biệt giòn và ngọt ngay cả khi bảo quản lâu.',
        price: 180000,
        originalPrice: 220000,
        unit: 'kg',
        stock: 50,
        sku: 'TNK-002',
        isFeatured: true,
        isActive: true,
        viewCount: 445,
        soldCount: 56,
        rating: 4.8,
        reviewCount: 48,
        categoryId: categories[2].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Nho Đen Black Magic Tây Ban Nha',
        slug: 'nho-den-black-magic',
        description: 'Nho Đen Black Magic từ Tây Ban Nha, quả mọng căng, vỏ mỏng màu đen ánh kim lạ mắt. Vị ngọt thơm đậm, không chua. Giàu resveratrol – chất chống lão hóa tự nhiên – và các vitamin cần thiết. Thích hợp ăn tươi, làm salad trái cây hoặc nước ép.',
        price: 250000,
        originalPrice: null,
        unit: 'kg',
        stock: 25,
        sku: 'TNK-003',
        isFeatured: false,
        isActive: true,
        viewCount: 287,
        soldCount: 18,
        rating: 4.7,
        reviewCount: 24,
        categoryId: categories[2].id,
      },
    }),

    // --- Nông Sản Khô (2 sản phẩm) ---
    prisma.product.create({
      data: {
        name: 'Gạo ST25 Ông Cua Sóc Trăng',
        slug: 'gao-st25-ong-cua-soc-trang',
        description: 'Gạo ST25 Ông Cua – vô địch gạo ngon nhất thế giới 2023. Hạt gạo dài, trắng mềm, nở đều, vị ngọt tự nhiên đặc trưng. Đặc biệt thơm lừng khi nấu, phù hợp cho cơm trắng, cơm rang, và các món ăn yêu cầu gạo dẻo thơm.',
        price: 85000,
        originalPrice: 95000,
        unit: 'kg',
        stock: 250,
        sku: 'NSK-001',
        isFeatured: true,
        isActive: true,
        viewCount: 634,
        soldCount: 287,
        rating: 5.0,
        reviewCount: 134,
        categoryId: categories[3].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Đậu Phộng Rang Muối Bạc Liêu',
        slug: 'dau-phong-rang-muoi-bac-lieu',
        description: 'Đậu phộng rang muối Bạc Liêu, hạt to đều, rang giòn vàng đều màu, rắc muối vừa phải không quá mặn. Đậu phộng giàu protein thực vật, chất béo tốt (omega-3), vitamin E và magiê. Là món ăn vặt lành mạnh, có thể dùng kèm cơm hoặc làm topping.',
        price: 65000,
        originalPrice: null,
        unit: 'kg',
        stock: 100,
        sku: 'NSK-002',
        isFeatured: false,
        isActive: true,
        viewCount: 198,
        soldCount: 67,
        rating: 4.6,
        reviewCount: 39,
        categoryId: categories[3].id,
      },
    }),
  ]);
  console.log(`  Created ${products.length} products`);

  // ===================== PRODUCT IMAGES =====================
  const imageMap: Record<string, { primary: string; secondary?: string }> = {
    [products[0].id]: {
      primary: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80',
      secondary: 'https://images.unsplash.com/photo-1561374618-abb7f4a2f9f2?w=800&q=80',
    },
    [products[1].id]: {
      primary: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&q=80',
    },
    [products[2].id]: {
      primary: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&q=80',
    },
    [products[3].id]: {
      primary: 'https://images.unsplash.com/photo-1597160558498-a8d6b90f5c8e?w=800&q=80',
    },
    [products[4].id]: {
      primary: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800&q=80',
    },
    [products[5].id]: {
      primary: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=800&q=80',
    },
    [products[6].id]: {
      primary: 'https://images.unsplash.com/photo-1583225194233-2f2c2a565d28?w=800&q=80',
    },
    [products[7].id]: {
      primary: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&q=80',
    },
    [products[8].id]: {
      primary: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80',
    },
    [products[9].id]: {
      primary: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80',
    },
    [products[10].id]: {
      primary: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
    },
    [products[11].id]: {
      primary: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80',
    },
  };

  for (const product of products) {
    const imgs = imageMap[product.id];
    if (!imgs) continue;

    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: imgs.primary,
        altText: product.name,
        isPrimary: true,
        sortOrder: 0,
      },
    });

    if (imgs.secondary) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: imgs.secondary,
          altText: `${product.name} – Hình ảnh minh họa`,
          isPrimary: false,
          sortOrder: 1,
        },
      });
    }
  }
  console.log(`  Created ${products.length + 1} product images (12 primary + 1 secondary)`);

  // ===================== REVIEWS =====================
  const reviewComments = [
    'Sản phẩm rất tươi, giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ tiếp!',
    'Đúng như hình, quả to, ngon, ngọt vừa. Mua lần 2 rồi, rất hài lòng.',
    'Giao hàng hơi trễ 1 ngày nhưng chất lượng sản phẩm tuyệt vời. Đóng gói kỹ, không hư.',
    'Mua làm quà tặng, bạn bè khen ngon. Sẽ giới thiệu thêm.',
    'So với giá thì chất lượng rất tốt. Đã mua nhiều lần và lần nào cũng ưng.',
    'Sản phẩm tươi, giao đúng hẹn. Nhân viên tư vấn nhiệt tình.',
    'Rất đáng tiền! Đã thử nhiều nơi nhưng chỗ này là ngon nhất.',
    'Đóng gói chắc chắn, hoa quả còn tươi rói. Cảm ơn shop!',
    'Mua online lần đầu, không ngờ giao hàng nhanh và sản phẩm chất lượng như vậy.',
    'Sẽ mua lại, chất lượng ổn định qua nhiều lần đặt.',
  ];

  const reviews = [];
  for (let i = 0; i < 12; i++) {
    const product = products[i % products.length];
    const user = allUsers[(i + 1) % allUsers.length];
    const rating = i < 4 ? 5 : i < 8 ? 4 : 5;
    reviews.push(
      await prisma.review.create({
        data: {
          userId: user.id,
          productId: product.id,
          rating,
          comment: reviewComments[i % reviewComments.length],
        },
      }),
    );
  }
  console.log(`  Created ${reviews.length} reviews`);

  // ===================== ORDERS =====================
  const orderStatuses: OrderStatus[] = [
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.SHIPPING,
    OrderStatus.COMPLETED,
    OrderStatus.COMPLETED,
    OrderStatus.COMPLETED,
  ];
  const paymentStatuses: PaymentStatus[] = [
    PaymentStatus.PENDING,
    PaymentStatus.PAID,
    PaymentStatus.PAID,
    PaymentStatus.PAID,
    PaymentStatus.PAID,
    PaymentStatus.PAID,
  ];

  const orders = [];
  for (let i = 0; i < 8; i++) {
    const user = allUsers[i % allUsers.length];
    const si = i % orderStatuses.length;
    const status = orderStatuses[si];
    const paymentStatus = paymentStatuses[si];

    const orderProducts = products.slice(i % 3, (i % 3) + 2);
    const subtotal = orderProducts.reduce(
      (sum, p) => sum + Number(p.price) * (i % 3 + 1),
      0,
    );
    const shippingFee = subtotal >= 500000 ? 0 : subtotal >= 200000 ? 15000 : 25000;
    const discount = subtotal >= 500000 ? Math.round(subtotal * 0.05) : 0;
    const total = subtotal + shippingFee - discount;

    const order = await prisma.order.create({
      data: {
        orderNumber: `WHQ${String(Date.now()).slice(-8)}${String(i + 1).padStart(2, '0')}`,
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
        confirmedAt: si >= 1 ? new Date(Date.now() - (8 - i) * 86400000 + 86400000) : null,
        shippedAt: si >= 2 ? new Date(Date.now() - (8 - i) * 86400000 + 172800000) : null,
        completedAt: si >= 3 ? new Date(Date.now() - (8 - i) * 86400000 + 259200000) : null,
      },
    });
    orders.push(order);

    for (const product of orderProducts) {
      const quantity = (i % 3) + 1;
      const primaryImage = await prisma.productImage.findFirst({
        where: { productId: product.id, isPrimary: true },
      });
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          productName: product.name,
          productImage: primaryImage?.url || null,
          quantity,
          price: Number(product.price),
          total: Number(product.price) * quantity,
        },
      });
    }

    await prisma.payment.create({
      data: {
        orderId: order.id,
        method: PaymentMethod.COD,
        amount: total,
        status: paymentStatus,
        paidAt: si >= 3 ? new Date(Date.now() - (8 - i) * 86400000 + 259200000) : null,
      },
    });
  }
  console.log(`  Created ${orders.length} orders`);

  // ===================== CHATBOT FAQs =====================
  const faqs = [
    {
      question: 'Cửa hàng mở cửa mấy giờ?',
      answer: 'Cửa hàng WebBanHoaQua mở cửa từ 7h00 sáng đến 21h00 tối các ngày trong tuần, kể cả cuối tuần và ngày lễ. Đội ngũ tư vấn online sẵn sàng hỗ trợ 24/7.',
      keywords: 'giờ,mở cửa,thời gian,giờ làm việc,open,time',
      category: 'general',
    },
    {
      question: 'Số điện thoại liên hệ là gì?',
      answer: 'Quý khách có thể liên hệ cửa hàng qua Hotline: 0909.123.456 hoặc 028.1234.5678. Đội ngũ tư vấn sẵn sàng hỗ trợ từ 7h00 đến 21h00 mỗi ngày.',
      keywords: 'điện thoại,phone,sdt,liên hệ,hotline,contact',
      category: 'general',
    },
    {
      question: 'Địa chỉ cửa hàng ở đâu?',
      answer: 'Cửa hàng WebBanHoaQua tọa lạc tại: 123 Đường Nông Sản, Quận 1, TP. Hồ Chí Minh. Quý khách có thể ghé thăm trực tiếp hoặc đặt hàng online với dịch vụ giao hàng tận nơi.',
      keywords: 'địa chỉ,đâu,ở đâu,location,address',
      category: 'general',
    },
    {
      question: 'Có giao hàng không? Phí ship bao nhiêu?',
      answer: 'Có, chúng tôi cung cấp dịch vụ giao hàng tận nơi trong TP. Hồ Chí Minh và các tỉnh thành lân cận. Phí ship: đơn dưới 200.000đ là 25.000đ, từ 200.000đ–dưới 500.000đ là 15.000đ, đơn từ 500.000đ trở lên được miễn phí giao hàng.',
      keywords: 'giao hàng,ship,delivery,vận chuyển,phí ship',
      category: 'shipping',
    },
    {
      question: 'Thời gian giao hàng bao lâu?',
      answer: 'Thời gian giao hàng trong TP. Hồ Chí Minh: 2–4 giờ. Các tỉnh thành khác: 1–3 ngày tùy khu vực. Đơn hàng đặt trước 12h sẽ được giao trong ngày.',
      keywords: 'thời gian giao,bao lâu,bao nhiêu lâu,delivery time',
      category: 'shipping',
    },
    {
      question: 'Chính sách đổi trả như thế nào?',
      answer: 'Chúng tôi chấp nhận đổi trả trong 24 giờ nếu sản phẩm không đúng như mô tả hoặc bị hư hỏng trong quá trình vận chuyển. Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng. Khách hàng cần chụp hình và gửi phản hồi qua hotline hoặc email.',
      keywords: 'đổi trả,trả lại,hoàn tiền,return,refund,đổi',
      category: 'general',
    },
    {
      question: 'Cách đặt hàng trên website như thế nào?',
      answer: 'Để đặt hàng: 1) Chọn sản phẩm và thêm vào giỏ hàng. 2) Kiểm tra giỏ hàng và điều chỉnh số lượng. 3) Điền thông tin giao hàng. 4) Chọn phương thức thanh toán. 5) Xác nhận đặt hàng. Bạn sẽ nhận được email xác nhận ngay sau khi đặt thành công.',
      keywords: 'đặt hàng,cách,mua,hướng dẫn,order,cách mua',
      category: 'order',
    },
    {
      question: 'Tôi muốn mua xoài, còn hàng không?',
      answer: 'Chúng tôi có Xoài Cát Hòa Lộc đang có sẵn với giá 65.000đ/kg (đang giảm từ 75.000đ). Đây là đặc sản miền Nam với vị ngọt thơm đặc trưng, thịt vàng óng. Còn 150kg trong kho. Bạn muốn tôi thêm vào giỏ hàng không?',
      keywords: 'xoài,mua,còn,hàng',
      category: 'product',
      productId: products[0].id,
    },
    {
      question: 'Còn bưởi da xanh không? Giá bao nhiêu?',
      answer: 'Còn hàng! Bưởi Da Xanh Bến Tre đang có 120kg với giá 35.000đ/kg (đang giảm từ 40.000đ). Đây là sản phẩm nổi bật với vỏ xanh, ruột hồng đỏ, rất được khách hàng yêu thích. Sản phẩm có đánh giá 4.9 sao.',
      keywords: 'bưởi,còn,hàng,giá,bao nhiêu',
      category: 'product',
      productId: products[2].id,
    },
    {
      question: 'Sản phẩm nào đang giảm giá?',
      answer: 'Hiện có nhiều sản phẩm đang được giảm giá: Xoài Cát Hòa Lộc (-13%), Bưởi Da Xanh (-12.5%), Rau Muống Thủy Canh (-18%), Cherry New Zealand (-16%), Táo Envy (-18%), Gạo ST25 (-10.5%). Khuyến mãi áp dụng đến khi hết stock.',
      keywords: 'giảm giá,khuyến mãi,sale,discount,giá tốt',
      category: 'price',
    },
    {
      question: 'Có sản phẩm nhập khẩu không?',
      answer: 'Có! Chúng tôi có các loại trái cây nhập khẩu cao cấp: Cherry New Zealand (320.000đ/kg), Táo Envy New Zealand (180.000đ/kg), Nho Đen Black Magic Tây Ban Nha (250.000đ/kg). Tất cả đều có nguồn gốc xuất xứ rõ ràng, đảm bảo chất lượng và an toàn thực phẩm.',
      keywords: 'nhập khẩu,trái cây,import,quốc tế',
      category: 'product',
    },
    {
      question: 'Cách thanh toán như thế nào?',
      answer: 'Chúng tôi hỗ trợ nhiều hình thức thanh toán: 1) COD – Thanh toán tiền mặt khi nhận hàng. 2) Chuyển khoản ngân hàng (thông tin tài khoản sẽ được gửi sau khi đặt hàng). 3) Ví điện tử MoMo và ZaloPay. Khách hàng có thể chọn phương thức phù hợp khi đặt hàng.',
      keywords: 'thanh toán,cách trả tiền,payment,thanh toán online',
      category: 'general',
    },
    {
      question: 'Làm sao theo dõi đơn hàng?',
      answer: 'Sau khi đặt hàng thành công, bạn sẽ nhận được mã đơn hàng qua email và SMS. Hãy đăng nhập vào tài khoản và vào mục "Đơn hàng của tôi" để theo dõi trạng thái. Bạn cũng sẽ nhận thông báo qua email mỗi khi đơn hàng thay đổi trạng thái.',
      keywords: 'theo dõi,tracking,đơn hàng,order status,đơn',
      category: 'order',
    },
    {
      question: 'Gạo ST25 còn không?',
      answer: 'Còn hàng! Gạo ST25 Ông Cua – vô địch gạo ngon nhất thế giới 2023 – đang có giá 85.000đ/kg (đang giảm từ 95.000đ). Còn 250kg trong kho. Đây là sản phẩm bán chạy nhất với 287 đơn đã bán và đánh giá 5.0 sao tuyệt đối.',
      keywords: 'gạo,ST25,còn,hàng',
      category: 'product',
      productId: products[10].id,
    },
    {
      question: 'Có sản phẩm nào bán chạy nhất không?',
      answer: 'Sản phẩm bán chạy nhất là Gạo ST25 Ông Cua với 287 đơn đã bán và đánh giá 5 sao. Tiếp theo là Bưởi Da Xanh (189 đơn), Xoài Cát Hòa Lộc (127 đơn), Rau Muống Thủy Canh (89 đơn) và Cherry New Zealand (42 đơn).',
      keywords: 'bán chạy,hot,popular,best seller',
      category: 'product',
    },
  ];

  for (let i = 0; i < faqs.length; i++) {
    const faq = faqs[i];
    await prisma.chatbotFAQ.create({
      data: {
        question: faq.question,
        answer: faq.answer,
        keywords: faq.keywords,
        category: faq.category,
        productId: faq.productId || null,
        isActive: true,
        priority: faqs.length - i,
      },
    });
  }
  console.log(`  Created ${faqs.length} chatbot FAQs`);

  // ===================== SUMMARY =====================
  console.log('\n======================================');
  console.log('         SEED COMPLETED!             ');
  console.log('======================================\n');
  console.log('  Test Account (Admin):');
  console.log('    Email:    admin@webbanhoaqua.com');
  console.log('    Password: MatKhau123');
  console.log('\n  Test Account (Customer):');
  console.log('    Email:    nguyen.van.an@email.com');
  console.log('    Password: MatKhau123');
  console.log('\n  Statistics:');
  console.log(`    Users      : ${allUsers.length} (1 admin + ${customers.length} customers)`);
  console.log(`    Categories : ${categories.length}`);
  console.log(`    Products   : ${products.length}`);
  console.log(`    Images     : ${products.length + 1}`);
  console.log(`    Reviews    : ${reviews.length}`);
  console.log(`    Orders     : ${orders.length}`);
  console.log(`    FAQs       : ${faqs.length}`);
  console.log('\n');
}

main()
  .catch((e) => {
    console.error('\n  Seed error:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
