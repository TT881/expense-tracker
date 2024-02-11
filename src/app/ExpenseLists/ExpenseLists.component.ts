import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../Dashboard/Dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-ExpenseLists',
  templateUrl: './ExpenseLists.component.html',
  styleUrls: ['./ExpenseLists.component.scss'],
  imports: [CommonModule, DashboardComponent, RouterModule, SharedModule],
})
export class ExpenseListsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
