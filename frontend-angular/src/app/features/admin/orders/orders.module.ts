import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin-orders.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [{ path: '', component: AdminOrdersComponent }];

@NgModule({
  declarations: [AdminOrdersComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class OrdersModule {}
