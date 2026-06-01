import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatbotService } from '../../../core/services';

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
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer?: ElementRef<HTMLDivElement>;

  isOpen = false;
  messages: ChatMessage[] = [];
  userMessage = '';
  isTyping = false;
  private shouldScrollToBottom = false;

  suggestions = [
    'Sản phẩm nào bán chạy?',
    'Còn xoài không?',
    'Giờ mở cửa?',
    'Có chương trình giảm giá không?',
    'Cách đặt hàng?',
    'Tra cứu đơn hàng',
  ];

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (!this.shouldScrollToBottom) return;
    this.shouldScrollToBottom = false;
    this.scrollToBottom();
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.requestScrollToBottom();
    }
  }

  sendMessage(message: string): void {
    if (!message.trim() || this.isTyping) return;

    const userMsg = message.trim();
    this.userMessage = '';

    this.messages.push({
      type: 'user',
      message: userMsg,
      timestamp: new Date(),
    });

    this.isTyping = true;
    this.requestScrollToBottom();

    this.chatbotService.sendMessage(userMsg).subscribe({
      next: (res) => {
        this.isTyping = false;
        if (res.success && res.data) {
          this.messages.push({
            type: 'bot',
            message: res.data.response,
            timestamp: new Date(),
          });
        }
        this.requestScrollToBottom();
      },
      error: () => {
        this.isTyping = false;
        this.messages.push({
          type: 'bot',
          message: 'Dạ, xin lỗi anh/chị, hiện chatbot đang gặp lỗi khi xử lý tin nhắn. Anh/chị thử lại sau ít phút hoặc liên hệ cửa hàng để được hỗ trợ nhanh hơn nhé.',
          timestamp: new Date(),
        });
        this.requestScrollToBottom();
      },
    });
  }

  private requestScrollToBottom(): void {
    this.shouldScrollToBottom = true;
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private scrollToBottom(): void {
    const container = this.messageContainer?.nativeElement;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }
}
