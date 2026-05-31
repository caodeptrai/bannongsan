import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../core/services';
import { SystemSetting } from '../../../core/models';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  settings: SystemSetting | null = null;

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
    this.settingService.getSettings().subscribe({
      next: (res) => {
        if (res.success) {
          this.settings = res.data;
        }
      }
    });
  }
}
