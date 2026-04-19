import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: ':id', loadChildren: () => import('./order-detail/order-detail.module').then(m => m.OrderDetailModule) }
];

@NgModule({
  declarations: [OrdersComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class OrdersModule {}
