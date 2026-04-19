import { Component } from '@angular/core';

@Component({
  selector: 'app-client-layout',
  template: `
    <div class="client-layout">
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .client-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .main-content {
      flex: 1;
    }
  `]
})
export class ClientLayoutComponent {}
