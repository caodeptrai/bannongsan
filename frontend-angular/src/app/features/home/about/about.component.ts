import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="about-page">
      <div class="page-header">
        <div class="container">
          <h1>Về WebBanHoaQua</h1>
          <p>Chuyên cung cấp nông sản tươi ngon, chất lượng cao</p>
        </div>
      </div>
      <div class="container">
        <section class="section">
          <div class="about-content">
            <div class="about-image">
              <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600" alt="WebBanHoaQua Store">
            </div>
            <div class="about-text">
              <h2>Giới thiệu về chúng tôi</h2>
              <p>WebBanHoaQua là cửa hàng chuyên cung cấp các loại nông sản tươi ngon, chất lượng cao từ khắp vùng miền Việt Nam. Chúng tôi cam kết mang đến cho khách hàng những sản phẩm tươi sạch nhất, đảm bảo nguồn gốc xuất xứ rõ ràng.</p>
              <p>Với sứ mệnh "Mang thiên nhiên đến từng gia đình", chúng tôi không ngừng nỗ lực để cung cấp sản phẩm tốt nhất với giá cả hợp lý nhất.</p>
            </div>
          </div>
        </section>

        <section class="section values-section">
          <h2 class="text-center">Giá trị cốt lõi</h2>
          <div class="values-grid">
            <div class="value-item">
              <span class="material-icons">eco</span>
              <h3>Sạch 100%</h3>
              <p>Tất cả sản phẩm đều được kiểm tra chất lượng nghiêm ngặt</p>
            </div>
            <div class="value-item">
              <span class="material-icons">local_shipping</span>
              <h3>Giao nhanh</h3>
              <p>Giao hàng trong 2-4 giờ trong nội thành TP.HCM</p>
            </div>
            <div class="value-item">
              <span class="material-icons">verified</span>
              <h3>Cam kết</h3>
              <p>Đổi trả trong 24h nếu sản phẩm không đạt chất lượng</p>
            </div>
            <div class="value-item">
              <span class="material-icons">support_agent</span>
              <h3>Hỗ trợ 24/7</h3>
              <p>Đội ngũ tư vấn luôn sẵn sàng hỗ trợ khách hàng</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      padding: 64px 0;
      text-align: center;
      h1 { font-size: 40px; margin-bottom: 12px; }
      p { opacity: 0.9; font-size: 18px; }
    }
    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
      @media (max-width: 768px) { grid-template-columns: 1fr; }
    }
    .about-image img { width: 100%; border-radius: 12px; box-shadow: var(--shadow); }
    .about-text h2 { font-size: 28px; margin-bottom: 20px; }
    .about-text p { color: var(--text-secondary); line-height: 1.8; margin-bottom: 16px; }
    .section { padding: 64px 0; }
    .values-section { background: var(--background-color); border-radius: 12px; padding: 64px; margin: 0 16px 64px; }
    .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; margin-top: 40px; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 600px) { grid-template-columns: 1fr; } }
    .value-item { text-align: center; padding: 24px; background: white; border-radius: 12px; box-shadow: var(--shadow); .material-icons { font-size: 48px; color: var(--primary-color); margin-bottom: 16px; } h3 { font-size: 18px; margin-bottom: 8px; } p { color: var(--text-secondary); font-size: 14px; } }
  `]
})
export class AboutComponent {}
