import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css'],
  imports: [CommonModule, SharedModule],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
