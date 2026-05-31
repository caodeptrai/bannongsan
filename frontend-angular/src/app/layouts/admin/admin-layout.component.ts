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
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  pageTitle = 'Dashboard';
  currentUser: any;
  sidebarOpen = false;
  sidebarCollapsed = false;

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
      this.sidebarOpen = false;
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
  }

  toggleSidebarCollapsed(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
