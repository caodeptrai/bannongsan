import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService, CartService, SettingService } from '../../../core/services';
import { SystemSetting, User } from '../../../core/models';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  settings: SystemSetting | null = null;
  cartCount = 0;
  mobileMenuOpen = false;
  userMenuOpen = false;
  searchQuery = '';

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private settingService: SettingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.cartService.itemCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.settingService.getSettings().subscribe({
      next: (res) => {
        if (res.success) {
          this.settings = res.data;
        }
      }
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
