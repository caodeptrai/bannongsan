import { Component, OnInit } from '@angular/core';
import { ChatbotService, CartService } from '../../../core/services';

interface ChatMessage {
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  template: `
    <div class="chatbot-container">
      <div class="chatbot-window" *ngIf="isOpen">
        <div class="chatbot-header">
          <div class="header-info">
            <span class="material-icons">smart_toy</span>
            <h3>Hỗ trợ WebBanHoaQua</h3>
          </div>
          <button class="close-btn" (click)="toggleChat()">
            <span class="material-icons">close</span>
          </button>
        </div>

        <div class="chatbot-messages" #messageContainer>
          <div class="chat-message bot">
            Xin chào! 👋 Tôi là trợ lý của WebBanHoaQua. Tôi có thể giúp gì cho bạn hôm nay?
          </div>

          <div class="chat-suggestions" *ngIf="messages.length === 1">
            <button *ngFor="let suggestion of suggestions" (click)="sendMessage(suggestion)">
              {{ suggestion }}
            </button>
          </div>

          <div *ngFor="let msg of messages" class="chat-message" [class.user]="msg.type === 'user'" [class.bot]="msg.type === 'bot'">
            {{ msg.message }}
          </div>

          <div class="typing-indicator" *ngIf="isTyping">
            <span></span><span></span><span></span>
          </div>
        </div>

        <div class="chatbot-input">
          <input
            type="text"
            [(ngModel)]="userMessage"
            (keyup.enter)="sendMessage(userMessage)"
            placeholder="Nhập tin nhắn..."
            [disabled]="isTyping">
          <button (click)="sendMessage(userMessage)" [disabled]="!userMessage.trim() || isTyping">
            <span class="material-icons">send</span>
          </button>
        </div>
      </div>

      <button class="chatbot-toggle" (click)="toggleChat()" [class.open]="isOpen">
        <span class="material-icons">{{ isOpen ? 'close' : 'chat' }}</span>
      </button>
    </div>
  `,
  styles: [`
    .chatbot-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000;
    }

    .chatbot-window {
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 380px;
      max-width: calc(100vw - 48px);
      height: 520px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: slideUp 0.3s ease;

      @media (max-width: 480px) {
        width: calc(100vw - 32px);
        right: -8px;
        height: 70vh;
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .chatbot-header {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .header-info {
        display: flex;
        align-items: center;
        gap: 10px;

        .material-icons {
          font-size: 28px;
        }

        h3 {
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          font-weight: 600;
        }
      }

      .close-btn {
        background: rgba(255,255,255,0.2);
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);

        .material-icons {
          font-size: 20px;
          color: white;
        }

        &:hover {
          background: rgba(255,255,255,0.3);
        }
      }
    }

    .chatbot-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #f8f9fa;
    }

    .chat-message {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.5;
      animation: fadeIn 0.3s ease;

      &.bot {
        background: white;
        color: var(--text-color);
        align-self: flex-start;
        border-bottom-left-radius: 4px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.1);
      }

      &.user {
        background: var(--primary-color);
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .chat-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 4px;
      align-self: flex-start;

      button {
        background: white;
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 12px;
        cursor: pointer;
        transition: var(--transition);

        &:hover {
          background: var(--primary-color);
          color: white;
        }
      }
    }

    .typing-indicator {
      display: flex;
      gap: 4px;
      padding: 12px;
      align-self: flex-start;

      span {
        width: 8px;
        height: 8px;
        background: var(--text-secondary);
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out;

        &:nth-child(1) { animation-delay: -0.32s; }
        &:nth-child(2) { animation-delay: -0.16s; }
      }
    }

    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }

    .chatbot-input {
      padding: 12px;
      border-top: 1px solid var(--border-color);
      display: flex;
      gap: 8px;
      background: white;

      input {
        flex: 1;
        padding: 10px 16px;
        border: 1px solid var(--border-color);
        border-radius: 24px;
        font-size: 14px;
        outline: none;
        transition: var(--transition);

        &:focus {
          border-color: var(--primary-color);
        }
      }

      button {
        background: var(--primary-color);
        color: white;
        border: none;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);

        .material-icons {
          font-size: 20px;
        }

        &:hover:not(:disabled) {
          background: var(--primary-dark);
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }

    .chatbot-toggle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      border: none;
      box-shadow: 0 4px 16px rgba(46, 125, 50, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);

      .material-icons {
        font-size: 28px;
      }

      &:hover {
        transform: scale(1.1);
        background: var(--primary-dark);
      }

      &.open {
        background: var(--text-secondary);
      }
    }
  `]
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
