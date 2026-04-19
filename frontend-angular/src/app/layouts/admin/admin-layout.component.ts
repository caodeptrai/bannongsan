import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/services';
import { filter } from 'rxjs/operators';

interface AdminMenuItem {
  title: string;
  icon: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-admin-layout',
  template: `
    <div class="admin-wrapper">
      <aside class="admin-sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <span class="material-icons">eco</span>
            <span>WebBan<span>HoaQua</span></span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section">
            <span class="nav-section-title">Tổng quan</span>
            <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-item">
              <span class="material-icons">dashboard</span>
              <span>Dashboard</span>
            </a>
          </div>

          <div class="nav-section">
            <span class="nav-section-title">Quản lý</span>
            <a routerLink="/admin/categories" routerLinkActive="active" class="nav-item">
              <span class="material-icons">category</span>
              <span>Danh mục</span>
            </a>
            <a routerLink="/admin/products" routerLinkActive="active" class="nav-item">
              <span class="material-icons">inventory_2</span>
              <span>Sản phẩm</span>
            </a>
            <a routerLink="/admin/orders" routerLinkActive="active" class="nav-item">
              <span class="material-icons">receipt_long</span>
              <span>Đơn hàng</span>
            </a>
            <a routerLink="/admin/users" routerLinkActive="active" class="nav-item">
              <span class="material-icons">people</span>
              <span>Khách hàng</span>
            </a>
            <a routerLink="/admin/statistics" routerLinkActive="active" class="nav-item">
              <span class="material-icons">bar_chart</span>
              <span>Thống kê</span>
            </a>
          </div>
        </nav>

        <div class="sidebar-footer">
          <a routerLink="/" target="_blank" class="nav-item">
            <span class="material-icons">open_in_new</span>
            <span>Xem website</span>
          </a>
          <button class="nav-item" (click)="logout()">
            <span class="material-icons">logout</span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      <div class="admin-main">
        <header class="admin-header">
          <div class="header-left">
            <button class="toggle-btn" (click)="toggleSidebar()">
              <span class="material-icons">menu</span>
            </button>
            <h1 class="page-title">{{ pageTitle }}</h1>
          </div>
          <div class="header-right">
            <div class="admin-info">
              <span class="material-icons">account_circle</span>
              <span>{{ currentUser?.fullName }}</span>
              <span class="badge badge-primary">Admin</span>
            </div>
          </div>
        </header>

        <div class="admin-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-wrapper {
      display: flex;
      min-height: 100vh;
      background: #f5f5f5;
    }

    .admin-sidebar {
      width: 260px;
      background: #1a1a2e;
      color: white;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      z-index: 100;
      transition: transform 0.3s ease;

      @media (max-width: 768px) {
        transform: translateX(-100%);

        &.open {
          transform: translateX(0);
        }
      }
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);

      .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Playfair Display', serif;
        font-size: 20px;
        font-weight: 700;

        .material-icons {
          font-size: 32px;
          color: #4caf50;
        }

        span span {
          color: #4caf50;
        }
      }
    }

    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      padding: 16px 0;
    }

    .nav-section {
      margin-bottom: 24px;

      .nav-section-title {
        display: block;
        padding: 8px 20px;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: rgba(255,255,255,0.5);
      }
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      color: rgba(255,255,255,0.8);
      transition: all 0.2s ease;
      cursor: pointer;
      text-decoration: none;
      border: none;
      background: none;
      width: 100%;
      font-size: 14px;

      .material-icons {
        font-size: 22px;
      }

      &:hover {
        background: rgba(255,255,255,0.1);
        color: white;
      }

      &.active {
        background: rgba(76, 175, 80, 0.2);
        color: #4caf50;
        border-left: 3px solid #4caf50;
      }
    }

    .sidebar-footer {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 8px 0;
    }

    .admin-main {
      flex: 1;
      margin-left: 260px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;

      @media (max-width: 768px) {
        margin-left: 0;
      }
    }

    .admin-header {
      background: white;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;

      .toggle-btn {
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

      .page-title {
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: var(--text-color);
        margin: 0;
      }
    }

    .header-right {
      .admin-info {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-color);

        .material-icons {
          font-size: 28px;
        }

        span:nth-child(2) {
          font-weight: 500;
        }
      }
    }

    .admin-content {
      flex: 1;
      padding: 24px;

      @media (max-width: 768px) {
        padding: 16px;
      }
    }
  `]
})
export class AdminLayoutComponent implements OnInit {
  pageTitle = 'Dashboard';
  currentUser: any;
  sidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updatePageTitle(event.urlAfterRedirects);
    });
  }

  updatePageTitle(url: string): void {
    const routeMap: { [key: string]: string } = {
      '/admin/dashboard': 'Dashboard',
      '/admin/categories': 'Quản lý Danh mục',
      '/admin/products': 'Quản lý Sản phẩm',
      '/admin/orders': 'Quản lý Đơn hàng',
      '/admin/users': 'Quản lý Khách hàng',
      '/admin/statistics': 'Thống kê Doanh thu',
    };

    for (const [route, title] of Object.entries(routeMap)) {
      if (url.startsWith(route)) {
        this.pageTitle = title;
        return;
      }
    }
    this.pageTitle = 'Admin';
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    const sidebar = document.querySelector('.admin-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open', this.sidebarOpen);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
