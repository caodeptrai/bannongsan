import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin-products.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [{ path: '', component: AdminProductsComponent }];

@NgModule({
  declarations: [AdminProductsComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class ProductsModule {}
