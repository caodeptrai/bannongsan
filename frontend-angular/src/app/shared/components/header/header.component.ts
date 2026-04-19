import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService, CartService } from '../../../core/services';
import { User } from '../../../core/models';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="header-top">
        <div class="container">
          <div class="header-top-content">
            <span class="welcome-text">Chào mừng đến với WebBanHoaQua!</span>
            <div class="header-top-links">
              <span><span class="material-icons">phone</span> 0909.123.456</span>
              <span><span class="material-icons">email</span> contact&#64;webbanhoaqua.com</span>
            </div>
          </div>
        </div>
      </div>

      <div class="header-main">
        <div class="container">
          <div class="header-main-content">
            <button class="mobile-menu-btn" (click)="toggleMobileMenu()">
              <span class="material-icons">{{ mobileMenuOpen ? 'close' : 'menu' }}</span>
            </button>

            <a routerLink="/" class="logo">
              <span class="logo-icon material-icons">eco</span>
              <span class="logo-text">WebBan<span>HoaQua</span></span>
            </a>

            <nav class="main-nav" [class.open]="mobileMenuOpen">
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Trang chủ</a>
              <a routerLink="/products" routerLinkActive="active">Sản phẩm</a>
              <a routerLink="/about" routerLinkActive="active">Giới thiệu</a>
              <a routerLink="/contact" routerLinkActive="active">Liên hệ</a>
            </nav>

            <div class="header-actions">
              <div class="search-box">
                <input type="text" placeholder="Tìm kiếm sản phẩm..." [(ngModel)]="searchQuery" (keyup.enter)="onSearch()">
                <button (click)="onSearch()"><span class="material-icons">search</span></button>
              </div>

              <a routerLink="/cart" class="cart-btn">
                <span class="material-icons">shopping_cart</span>
                <span class="cart-count" *ngIf="cartCount > 0">{{ cartCount }}</span>
              </a>

              <div class="user-menu" *ngIf="currentUser">
                <button class="user-btn" (click)="toggleUserMenu()">
                  <span class="material-icons">account_circle</span>
                  <span class="user-name">{{ currentUser.fullName }}</span>
                </button>
                <div class="user-dropdown" [class.show]="userMenuOpen">
                  <a routerLink="/profile" (click)="closeMenus()">
                    <span class="material-icons">person</span> Hồ sơ
                  </a>
                  <a routerLink="/orders" (click)="closeMenus()">
                    <span class="material-icons">receipt_long</span> Đơn hàng
                  </a>
                  <a routerLink="/admin" *ngIf="currentUser.role === 'ADMIN'" (click)="closeMenus()">
                    <span class="material-icons">admin_panel_settings</span> Quản trị
                  </a>
                  <hr>
                  <a (click)="logout()">
                    <span class="material-icons">logout</span> Đăng xuất
                  </a>
                </div>
              </div>

              <a routerLink="/auth/login" class="btn btn-primary btn-sm" *ngIf="!currentUser">
                Đăng nhập
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: white;
      box-shadow: var(--shadow);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header-top {
      background: var(--primary-dark);
      color: white;
      padding: 8px 0;
      font-size: 13px;
    }

    .header-top-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-top-links {
      display: flex;
      gap: 24px;

      span {
        display: flex;
        align-items: center;
        gap: 4px;

        .material-icons {
          font-size: 16px;
        }
      }
    }

    .header-main {
      padding: 16px 0;
    }

    .header-main-content {
      display: flex;
      align-items: center;
      gap: 32px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: var(--text-color);

      .logo-icon {
        font-size: 36px;
        color: var(--primary-color);
      }

      .logo-text {
        font-family: 'Playfair Display', serif;
        font-size: 22px;
        font-weight: 700;

        span {
          color: var(--primary-color);
        }
      }
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;

      .material-icons {
        font-size: 28px;
        color: var(--text-color);
      }

      @media (max-width: 768px) {
        display: block;
      }
    }

    .main-nav {
      display: flex;
      gap: 32px;
      flex: 1;

      a {
        font-weight: 500;
        color: var(--text-color);
        padding: 4px 0;
        position: relative;

        &:hover, &.active {
          color: var(--primary-color);
        }

        &.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--primary-color);
        }
      }

      @media (max-width: 768px) {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        gap: 0;
        box-shadow: var(--shadow);
        padding: 16px;

        &.open {
          display: flex;
        }

        a {
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color);
        }
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .search-box {
      display: flex;
      border: 1px solid var(--border-color);
      border-radius: 24px;
      overflow: hidden;

      input {
        border: none;
        padding: 8px 16px;
        width: 220px;
        font-size: 14px;
        outline: none;

        @media (max-width: 1024px) {
          width: 180px;
        }
      }

      button {
        background: var(--primary-color);
        border: none;
        padding: 8px 12px;
        cursor: pointer;
        color: white;

        .material-icons {
          font-size: 20px;
        }
      }

      @media (max-width: 768px) {
        display: none;
      }
    }

    .cart-btn {
      position: relative;
      padding: 8px;
      color: var(--text-color);

      .material-icons {
        font-size: 28px;
      }

      .cart-count {
        position: absolute;
        top: 0;
        right: 0;
        background: var(--secondary-color);
        color: white;
        font-size: 11px;
        font-weight: 600;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        color: var(--primary-color);
      }
    }

    .user-menu {
      position: relative;

      .user-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        color: var(--text-color);

        .material-icons {
          font-size: 28px;
        }

        .user-name {
          font-weight: 500;
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .user-name {
            display: none;
          }
        }
      }

      .user-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-hover);
        min-width: 200px;
        display: none;
        overflow: hidden;

        &.show {
          display: block;
        }

        a {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          transition: var(--transition);

          .material-icons {
            font-size: 20px;
            color: var(--text-secondary);
          }

          &:hover {
            background: var(--background-color);
            color: var(--primary-color);
          }
        }

        hr {
          margin: 4px 0;
          border: none;
          border-top: 1px solid var(--border-color);
        }
      }
    }

    .btn-sm {
      padding: 8px 16px;
      font-size: 13px;
    }
  `]
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  cartCount = 0;
  mobileMenuOpen = false;
  userMenuOpen = false;
  searchQuery = '';

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.cartService.itemCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeMenus();
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      this.userMenuOpen = false;
    }
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  closeMenus(): void {
    this.mobileMenuOpen = false;
    this.userMenuOpen = false;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchQuery.trim() } });
      this.searchQuery = '';
    }
  }

  logout(): void {
    this.authService.logout();
    this.closeMenus();
    this.router.navigate(['/']);
  }
}
