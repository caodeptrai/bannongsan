import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, CategoryService } from '../../core/services';
import { Product, Category } from '../../core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  newArrivals: Product[] = [];
  categories: Category[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.categoryService.getCategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.data;
        }
      },
      error: () => {
        console.error('Error loading categories');
      }
    });

    this.productService.getFeaturedProducts(8).subscribe({
      next: (res) => {
        if (res.success) {
          this.featuredProducts = res.data;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });

    this.productService.getNewArrivals(4).subscribe({
      next: (res) => {
        if (res.success) {
          this.newArrivals = res.data;
        }
      },
      error: () => {
        console.error('Error loading new arrivals');
      }
    });
  }
}
