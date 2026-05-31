import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../core/services';
import { SystemSetting } from '../../../core/models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
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
