import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [{ path: '', component: AdminUsersComponent }];

@NgModule({
  declarations: [AdminUsersComponent],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class UsersModule {}
