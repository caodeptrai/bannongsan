import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService, ProductService, UiFeedbackService } from '../../../core/services';
import { Product } from '../../../core/models';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  loading = true;
  selectedImage = '';
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private feedback: UiFeedbackService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadProduct(slug);
      }
    });
  }

  loadProduct(slug: string): void {
    this.loading = true;
    this.productService.getProductBySlug(slug).subscribe({
      next: (res) => {
        if (res.success) {
          this.product = res.data;
          this.selectedImage = this.product.images && this.product.images.length > 0
            ? this.product.images[0].url
            : 'https://via.placeholder.com/600';
          this.loadRelatedProducts();
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/products']);
      }
    });
  }

  loadRelatedProducts(): void {
    if (this.product) {
      this.productService.getRelatedProducts(this.product.id, this.product.categoryId, 4).subscribe({
        next: (res) => {
          if (res.success) {
            this.relatedProducts = res.data;
          }
        }
      });
    }
  }

  selectImage(url: string): void {
    this.selectedImage = url;
  }

  get discountPercent(): number {
    if (this.product?.originalPrice && this.product.originalPrice > this.product.price) {
      return Math.round((1 - this.product.price / this.product.originalPrice) * 100);
    }
    return 0;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) this.quantity++;
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity).subscribe({
        next: (res) => {
          if (res.success) {
            this.cartService.loadCart();
            this.feedback.success(`Đã thêm ${this.quantity} ${this.product?.unit} "${this.product?.name}" vào giỏ hàng.`);
          }
        },
        error: (err) => {
          this.feedback.error(err.error?.message || 'Không thể thêm vào giỏ hàng.');
        }
      });
    }
  }
}
