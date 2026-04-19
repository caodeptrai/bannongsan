import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: CheckoutComponent }
];

@NgModule({
  declarations: [CheckoutComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class CheckoutModule {}
