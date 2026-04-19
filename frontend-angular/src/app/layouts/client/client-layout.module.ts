import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './client-layout.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard, GuestGuard } from '../../core/guards';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('../../features/home/home.module').then(m => m.HomeModule) },
      { path: 'products', loadChildren: () => import('../../features/products/products.module').then(m => m.ProductsModule) },
      { path: 'products/:slug', loadChildren: () => import('../../features/products/product-detail/product-detail.module').then(m => m.ProductDetailModule) },
      { path: 'cart', loadChildren: () => import('../../features/cart/cart.module').then(m => m.CartModule) },
      { path: 'checkout', loadChildren: () => import('../../features/checkout/checkout.module').then(m => m.CheckoutModule), canActivate: [AuthGuard] },
      { path: 'orders', loadChildren: () => import('../../features/orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuard] },
      { path: 'orders/:id', loadChildren: () => import('../../features/orders/order-detail/order-detail.module').then(m => m.OrderDetailModule), canActivate: [AuthGuard] },
      { path: 'profile', loadChildren: () => import('../../features/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
      { path: 'about', loadChildren: () => import('../../features/home/about/about.module').then(m => m.AboutModule) },
      { path: 'contact', loadChildren: () => import('../../features/home/contact/contact.module').then(m => m.ContactModule) },
      { path: 'auth', loadChildren: () => import('../../features/auth/auth.module').then(m => m.AuthModule), canActivate: [GuestGuard] },
    ]
  }
];

@NgModule({
  declarations: [ClientLayoutComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class ClientLayoutModule {}
