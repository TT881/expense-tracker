import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../Dashboard/Dashboard.component';

@Component({
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  selector: 'app-ExpenseLists',
  templateUrl: './ExpenseLists.component.html',
  styleUrls: ['./ExpenseLists.component.css'],
})
export class ExpenseListsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
