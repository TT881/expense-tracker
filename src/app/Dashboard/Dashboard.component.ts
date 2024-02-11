import { GlobalTitleService } from './../globalTitle.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  standalone: true,
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.scss'],
  imports: [CommonModule, SharedModule, MatTabsModule],
})
export class DashboardComponent implements OnInit {
  TitleName: string | undefined;

  constructor(
    private _titleService: GlobalTitleService,
    private cdr: ChangeDetectorRef
  ) {
    this._titleService.$titleName.subscribe((name) => {
      this.TitleName = name;
      this.cdr.markForCheck();
    });
  }
  ngOnInit(): void {
    this._titleService.$titleName.subscribe((name) => {
      this.TitleName = name;
    });
  }
}
