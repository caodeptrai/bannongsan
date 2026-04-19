import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: CartComponent }
];

@NgModule({
  declarations: [CartComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class CartModule {}
