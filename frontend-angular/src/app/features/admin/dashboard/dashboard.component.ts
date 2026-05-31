import { Component, OnInit } from '@angular/core';
import { UserService, OrderService } from '../../../core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stats: any = null;

  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.userService.getDashboardStats().subscribe({
      next: (res) => {
        if (res.success) {
          this.stats = res.data;
        }
      }
    });
  }
}
