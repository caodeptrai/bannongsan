import { Component, OnInit } from '@angular/core';
import { ChatbotService, CartService } from '../../../core/services';

interface ChatMessage {
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit {
  isOpen = false;
  messages: ChatMessage[] = [];
  userMessage = '';
  isTyping = false;

  suggestions = [
    'Sản phẩm nào bán chạy?',
    'Còn xoài không?',
    'Giờ mở cửa?',
    'Có giao hàng không?',
    'Cách đặt hàng?',
  ];

  constructor(
    private chatbotService: ChatbotService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  sendMessage(message: string): void {
    if (!message.trim() || this.isTyping) return;

    const userMsg = message.trim();
    this.userMessage = '';

    this.messages.push({
      type: 'user',
      message: userMsg,
      timestamp: new Date()
    });

    this.isTyping = true;

    this.chatbotService.sendMessage(userMsg).subscribe({
      next: (res) => {
        this.isTyping = false;
        if (res.success && res.data) {
          this.messages.push({
            type: 'bot',
            message: res.data.response,
            timestamp: new Date()
          });
        }
      },
      error: () => {
        this.isTyping = false;
        this.messages.push({
          type: 'bot',
          message: 'Xin lỗi, đã có lỗi xảy ra. Bạn có thể liên hệ hotline 0909.123.456 để được hỗ trợ nhé!',
          timestamp: new Date()
        });
      }
    });
  }
}
