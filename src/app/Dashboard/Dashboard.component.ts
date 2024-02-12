import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SideNavComponent } from '../shared/side-nav/side-nav.component';

@Component({
  standalone: true,
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.scss'],
  imports: [CommonModule, SharedModule, MatTabsModule],
})
export class DashboardComponent implements OnInit {
  TitleName: string | undefined;
  @Input() Name: string | undefined = 'My Dashboard';

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.TitleName = this.Name;
  }
}
