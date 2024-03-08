import { Route } from '@angular/router';
import { ExpenseListsComponent } from './ExpenseLists/ExpenseLists.component';
import { ExpenseHistoryComponent } from './ExpenseHistory/ExpenseHistory.component';
import { AuthGuardService } from './shared/services/AuthGuard.service';

export const EXPENSE_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'expenses', //default  view when accessing /expenses
  },
  {
    path: 'submit-expense',
    component: ExpenseListsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'expense-history',
    component: ExpenseHistoryComponent,
    canActivate: [AuthGuardService],
  },
];
