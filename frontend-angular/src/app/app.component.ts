import { Component, OnInit } from '@angular/core';
import { AuthService, CartService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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
