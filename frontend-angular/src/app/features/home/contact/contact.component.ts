import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <div class="contact-page">
      <div class="page-header">
        <div class="container">
          <h1>Liên Hệ</h1>
          <p>Hãy liên hệ với chúng tôi nếu bạn cần hỗ trợ</p>
        </div>
      </div>
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>Thông Tin Liên Hệ</h2>
            <div class="info-item">
              <span class="material-icons">location_on</span>
              <div>
                <strong>Địa chỉ</strong>
                <p>123 Đường Nông Sản, Quận 1, TP.HCM</p>
              </div>
            </div>
            <div class="info-item">
              <span class="material-icons">phone</span>
              <div>
                <strong>Điện thoại</strong>
                <p>0909.123.456</p>
              </div>
            </div>
            <div class="info-item">
              <span class="material-icons">email</span>
              <div>
                <strong>Email</strong>
                <p>contact&#64;webbanhoaqua.com</p>
              </div>
            </div>
            <div class="info-item">
              <span class="material-icons">schedule</span>
              <div>
                <strong>Giờ làm việc</strong>
                <p>7:00 - 21:00 (Thứ 2 - CN)</p>
              </div>
            </div>
          </div>
          <div class="contact-form-wrapper">
            <h2>Gửi Tin Nhắn</h2>
            <form class="contact-form">
              <div class="form-group">
                <label>Họ và tên</label>
                <input type="text" class="form-control" placeholder="Nhập họ tên của bạn">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" placeholder="Nhập email của bạn">
              </div>
              <div class="form-group">
                <label>Số điện thoại</label>
                <input type="tel" class="form-control" placeholder="Nhập số điện thoại">
              </div>
              <div class="form-group">
                <label>Nội dung</label>
                <textarea class="form-control" rows="5" placeholder="Nhập nội dung tin nhắn"></textarea>
              </div>
              <button type="button" class="btn btn-primary btn-block">Gửi tin nhắn</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)); color: white; padding: 64px 0; text-align: center; h1 { font-size: 40px; margin-bottom: 12px; } p { opacity: 0.9; font-size: 18px; } }
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 64px 0; @media (max-width: 768px) { grid-template-columns: 1fr; } }
    .contact-info, .contact-form-wrapper { background: white; border-radius: 12px; padding: 32px; box-shadow: var(--shadow); h2 { font-size: 24px; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid var(--primary-color); } }
    .info-item { display: flex; gap: 16px; margin-bottom: 24px; .material-icons { font-size: 28px; color: var(--primary-color); flex-shrink: 0; } strong { display: block; margin-bottom: 4px; } p { color: var(--text-secondary); margin: 0; } }
    .form-group { margin-bottom: 16px; label { display: block; margin-bottom: 6px; font-weight: 500; } }
  `]
})
export class ContactComponent {}
