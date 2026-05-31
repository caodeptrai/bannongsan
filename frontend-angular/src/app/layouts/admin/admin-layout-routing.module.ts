import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('../../features/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'categories', loadChildren: () => import('../../features/admin/categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'products', loadChildren: () => import('../../features/admin/products/products.module').then(m => m.ProductsModule) },
      { path: 'orders', loadChildren: () => import('../../features/admin/orders/orders.module').then(m => m.OrdersModule) },
      { path: 'users', loadChildren: () => import('../../features/admin/users/users.module').then(m => m.UsersModule) },
      { path: 'statistics', loadChildren: () => import('../../features/admin/statistics/statistics.module').then(m => m.StatisticsModule) },
      { path: 'settings', loadChildren: () => import('../../features/admin/settings/settings.module').then(m => m.SettingsModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule {}
