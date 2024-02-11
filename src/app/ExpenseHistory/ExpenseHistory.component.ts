import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from '../Dashboard/Dashboard.component';

@Component({
  standalone: true,
  imports: [RouterModule, SharedModule, DashboardComponent],
  selector: 'app-ExpenseHistory',
  templateUrl: './ExpenseHistory.component.html',
  styleUrls: ['./ExpenseHistory.component.scss'],
})
export class ExpenseHistoryComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
