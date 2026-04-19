import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [{ path: '', component: CategoriesComponent }];

@NgModule({
  declarations: [CategoriesComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class CategoriesModule {}
