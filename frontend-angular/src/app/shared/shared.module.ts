import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { FeedbackHostComponent } from './components/feedback-host/feedback-host.component';

// Pipes
import { VndCurrencyPipe } from './pipes/vnd-currency.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    ChatbotComponent,
    FeedbackHostComponent,
    VndCurrencyPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
  
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    ChatbotComponent,
    FeedbackHostComponent,
    VndCurrencyPipe,
  ]
})
export class SharedModule {}
