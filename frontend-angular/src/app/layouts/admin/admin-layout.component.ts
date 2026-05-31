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
      <aside class="admin-sidebar" [class.open]="sidebarOpen">
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
            <a routerLink="/admin/settings" routerLinkActive="active" class="nav-item">
              <span class="material-icons">settings</span>
              <span>Cấu hình</span>
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
      <div class="sidebar-backdrop" [class.show]="sidebarOpen" (click)="toggleSidebar()"></div>

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
      background: #eef3ef;
      color: #182230;
    }

    .admin-sidebar {
      width: 272px;
      background: #111827;
      color: white;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      z-index: 120;
      transition: transform 0.3s ease;
      box-shadow: 18px 0 40px rgba(15, 23, 42, 0.22);

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
        font-family: inherit;
        font-size: 20px;
        font-weight: 800;
        letter-spacing: 0;

        .material-icons {
          font-size: 32px;
          color: #86efac;
        }

        span span {
          color: #86efac;
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
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: rgba(255,255,255,0.48);
        font-weight: 700;
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
      font-weight: 600;
      border-left: 3px solid transparent;

      .material-icons {
        font-size: 22px;
      }

      &:hover {
        background: rgba(255,255,255,0.1);
        color: white;
      }

      &.active {
        background: rgba(134, 239, 172, 0.14);
        color: #86efac;
        border-left-color: #86efac;
      }
    }

    .sidebar-footer {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 8px 0;
    }

    .admin-main {
      flex: 1;
      margin-left: 272px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;

      @media (max-width: 768px) {
        margin-left: 0;
      }
    }

    .admin-header {
      background: white;
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 0 rgba(15, 23, 42, 0.08);
      position: sticky;
      top: 0;
      z-index: 50;
      min-height: 68px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;

      .toggle-btn {
        display: none;
        background: #f2f4f7;
        border: 1px solid #e4e7ec;
        border-radius: 8px;
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .material-icons {
          font-size: 24px;
          color: #344054;
        }

        @media (max-width: 768px) {
          display: inline-flex;
        }
      }

      .page-title {
        font-family: inherit;
        font-size: 20px;
        font-weight: 800;
        color: #182230;
        margin: 0;
      }
    }

    .header-right {
      .admin-info {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #344054;
        padding: 8px 10px;
        border: 1px solid #e4e7ec;
        border-radius: 999px;
        background: #ffffff;

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
      padding: 28px;
      width: 100%;
      max-width: 1480px;

      @media (max-width: 768px) {
        padding: 16px;
      }
    }

    .sidebar-backdrop {
      display: none;

      @media (max-width: 768px) {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.48);
        z-index: 110;

        &.show {
          display: block;
        }
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
      '/admin/settings': 'Cấu hình hệ thống',
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
