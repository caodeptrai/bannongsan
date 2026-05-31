import { Component } from '@angular/core';
import { FeedbackToast, FeedbackType, UiFeedbackService } from '../../../core/services/ui-feedback.service';

@Component({
  selector: 'app-feedback-host',
  templateUrl: './feedback-host.component.html',
  styleUrls: ['./feedback-host.component.scss'],
})
export class FeedbackHostComponent {
  constructor(public feedback: UiFeedbackService) {}

  trackToast(index: number, toast: FeedbackToast): number {
    return toast.id;
  }

  getIcon(type: FeedbackType): string {
    const icons: Record<FeedbackType, string> = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info',
    };
    return icons[type];
  }
}
