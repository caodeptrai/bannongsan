import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type FeedbackType = 'success' | 'error' | 'warning' | 'info';

export interface FeedbackToast {
  id: number;
  type: FeedbackType;
  title: string;
  message: string;
}

export interface FeedbackModal {
  type: FeedbackType;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  destructive: boolean;
  resolve: (confirmed: boolean) => void;
}

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: FeedbackType;
  destructive?: boolean;
}

@Injectable({ providedIn: 'root' })
export class UiFeedbackService {
  private toastId = 0;
  private readonly toastsSubject = new BehaviorSubject<FeedbackToast[]>([]);
  private readonly modalSubject = new BehaviorSubject<FeedbackModal | null>(null);

  readonly toasts$ = this.toastsSubject.asObservable();
  readonly modal$ = this.modalSubject.asObservable();

  success(message: string, title = 'Thành công'): void {
    this.toast('success', message, title);
  }

  error(message: string, title = 'Có lỗi xảy ra'): void {
    this.toast('error', message, title, 6000);
  }

  warning(message: string, title = 'Cần kiểm tra'): void {
    this.toast('warning', message, title, 5000);
  }

  info(message: string, title = 'Thông báo'): void {
    this.toast('info', message, title);
  }

  confirm(options: ConfirmOptions): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.modalSubject.next({
        type: options.type || (options.destructive ? 'warning' : 'info'),
        title: options.title || 'Xác nhận thao tác',
        message: options.message,
        confirmText: options.confirmText || 'Xác nhận',
        cancelText: options.cancelText || 'Hủy',
        destructive: Boolean(options.destructive),
        resolve,
      });
    });
  }

  resolveModal(confirmed: boolean): void {
    const modal = this.modalSubject.value;
    if (!modal) return;

    modal.resolve(confirmed);
    this.modalSubject.next(null);
  }

  dismissToast(id: number): void {
    this.toastsSubject.next(this.toastsSubject.value.filter((toast) => toast.id !== id));
  }

  private toast(type: FeedbackType, message: string, title: string, duration = 4200): void {
    const toast: FeedbackToast = {
      id: ++this.toastId,
      type,
      title,
      message,
    };

    this.toastsSubject.next([toast, ...this.toastsSubject.value].slice(0, 4));
    window.setTimeout(() => this.dismissToast(toast.id), duration);
  }
}
