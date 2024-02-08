import { Route } from '@angular/router';
import { ExpenseListsComponent } from './ExpenseLists/ExpenseLists.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';

export const EXPENSE_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'expenses', //default
  },
  { path: 'expenses', component: ExpenseListsComponent },
  { path: 'tingting', component: DashboardComponent },
];
