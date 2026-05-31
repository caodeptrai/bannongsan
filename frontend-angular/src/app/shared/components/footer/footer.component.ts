import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../core/services';
import { SystemSetting } from '../../../core/models';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer-main">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <h3 class="footer-logo">
                <span class="material-icons">eco</span>
                {{ settings?.siteName || 'WebBanHoaQua' }}
              </h3>
              <p class="footer-desc">
                Chuyên cung cấp các loại nông sản tươi ngon, chất lượng cao, đảm bảo nguồn gốc xuất xứ rõ ràng.
              </p>
              <div class="footer-social">
                <a href="#"><span class="material-icons">facebook</span></a>
                <a href="#"><span class="material-icons">youtube</span></a>
                <a href="#"><span class="material-icons">instagram</span></a>
              </div>
            </div>

            <div class="footer-col">
              <h4>Liên kết nhanh</h4>
              <ul>
                <li><a routerLink="/">Trang chủ</a></li>
                <li><a routerLink="/products">Sản phẩm</a></li>
                <li><a routerLink="/about">Giới thiệu</a></li>
                <li><a routerLink="/contact">Liên hệ</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Danh mục sản phẩm</h4>
              <ul>
                <li><a routerLink="/products">Trái Cây Tươi</a></li>
                <li><a routerLink="/products">Rau Củ Quả</a></li>
                <li><a routerLink="/products">Trái Cây Nhập Khẩu</a></li>
                <li><a routerLink="/products">Nông Sản Khô</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Liên hệ</h4>
              <ul class="contact-info">
                <li>
                  <span class="material-icons">location_on</span>
                  {{ settings?.address || '123 Đường Nông Sản, Quận 1, TP.HCM' }}
                </li>
                <li>
                  <span class="material-icons">phone</span>
                  {{ settings?.contactPhone || '0909.123.456' }}
                </li>
                <li>
                  <span class="material-icons">email</span>
                  {{ settings?.contactEmail || 'contact@webbanhoaqua.com' }}
                </li>
                <li>
                  <span class="material-icons">schedule</span>
                  {{ settings?.businessHours || '7:00 - 21:00 (Thứ 2 - CN)' }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container">
          <p>&copy; 2026 {{ settings?.siteName || 'WebBanHoaQua' }}. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1a1a2e;
      color: #ccc;
      margin-top: auto;
    }

    .footer-main {
      padding: 48px 0 32px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
      gap: 48px;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .footer-col {
      h4 {
        color: white;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 2px;
          background: var(--primary-color);
        }
      }

      ul {
        list-style: none;

        li {
          margin-bottom: 12px;

          a, span {
            transition: var(--transition);
          }

          a:hover {
            color: var(--primary-light);
          }
        }
      }
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      color: white;
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      margin-bottom: 16px;

      .material-icons {
        font-size: 32px;
        color: var(--primary-light);
      }
    }

    .footer-desc {
      line-height: 1.7;
      margin-bottom: 16px;
    }

    .footer-social {
      display: flex;
      gap: 12px;

      a {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255,255,255,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);

        .material-icons {
          font-size: 20px;
        }

        &:hover {
          background: var(--primary-color);
          color: white;
        }
      }
    }

    .contact-info {
      li {
        display: flex;
        align-items: flex-start;
        gap: 12px;

        .material-icons {
          font-size: 20px;
          color: var(--primary-light);
          flex-shrink: 0;
          margin-top: 2px;
        }
      }
    }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 20px 0;
      text-align: center;
      font-size: 14px;
    }
  `]
})
export class FooterComponent implements OnInit {
  settings: SystemSetting | null = null;

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
    this.settingService.getSettings().subscribe({
      next: (res) => {
        if (res.success) {
          this.settings = res.data;
        }
      }
    });
  }
}
