import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AdminGuard, GuestGuard } from './core/guards';

const routes: Routes = [
  // Client Layout - lazy load
  {
    path: '',
    loadChildren: () => import('./layouts/client/client-layout.module').then(m => m.ClientLayoutModule)
  },

  // Admin Layout
  {
    path: 'admin',
    loadChildren: () => import('./layouts/admin/admin-layout.module').then(m => m.AdminLayoutModule),
    canActivate: [AdminGuard]
  },

  // Default redirect
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
