import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  { path: '', component: OrderDetailComponent }
];

@NgModule({
  declarations: [OrderDetailComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class OrderDetailModule {}
