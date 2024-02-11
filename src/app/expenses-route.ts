import { Route } from '@angular/router';
import { ExpenseListsComponent } from './ExpenseLists/ExpenseLists.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { ExpenseHistoryComponent } from './ExpenseHistory/ExpenseHistory.component';

export const EXPENSE_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'expenses', //default
  },
  { path: 'submit-expense', component: ExpenseListsComponent },
  { path: 'expense-history', component: ExpenseHistoryComponent },
];
