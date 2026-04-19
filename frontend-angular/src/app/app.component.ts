import { Component, OnInit } from '@angular/core';
import { AuthService, CartService } from './core/services';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-chatbot></app-chatbot>
  `,
  styles: [`
    .main-content {
      flex: 1;
      min-height: calc(100vh - 200px);
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Load cart when app initializes
    if (this.authService.isLoggedIn) {
      this.cartService.loadCart();
    }
  }
}
