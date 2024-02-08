import { DashboardComponent } from './Dashboard/Dashboard.component';
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'expenselits',
    loadComponent: () =>
      import('./ExpenseLists/ExpenseLists.component').then(
        (m) => m.ExpenseListsComponent
      ),
  },
  {
    path: 'expenses',
    loadChildren: () =>
      import('./expenses-route').then((mod) => mod.EXPENSE_ROUTES),
  },
];
