import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  { path: '', component: ProductDetailComponent }
];

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class ProductDetailModule {}
