import { AuthenticationService } from './../shared/services/Authentication.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../Dashboard/Dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { APIService } from '../shared/services/API.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from '../shared/services/toastr.service';
import { TostrInterface } from '../shared/Models/TostrInterface';
import { error } from 'console';
import { SpreadSheetComponent } from '../shared/Components/SpreadSheet/SpreadSheet.component';
import { filter, tap } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  standalone: true,
  selector: 'app-ExpenseLists',
  templateUrl: './ExpenseLists.component.html',
  styleUrls: ['./ExpenseLists.component.scss'],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    DashboardComponent,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SpreadSheetComponent,
  ],
})
export class ExpenseListsComponent implements OnInit {
  SelectedCategoryId: string | undefined;
  categories: any[] = [];
  tableID: any = 1;
  displayedColumns: any[] | undefined;
  displayedColumnField: any;
  datasource!: MatTableDataSource<any>;

  constructor(
    private fg: FormBuilder,
    private apiservice: APIService,
    private authservice: AuthenticationService,
    private tostrService: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {}
  titleName: string | undefined = 'Expense Management';

  ExpenseListForm!: FormGroup;
  userId!: number;
  typeSelected: string = 'Ball Spin Clockwise';

  ngOnInit() {
    this.GetCategory();
    this.GetDailyExpenseColumnConfig();
    this.userId = Number(localStorage.getItem('ExpenseUserID'));
    this.ExpenseListForm = this.fg.group({
      category: ['', Validators.required],
      date: ['', Validators.required],
      Remark: [''],
      Cost: ['', Validators.required],
      UserID: [localStorage.getItem('ExpenseUserID')],
    });
    this.GetDailyExpenseTableData();
  }

  country1 = 1;

  onSubmit(value: any) {
    this.spinnerService.show();
    if (value) {
      this.apiservice.SubmitExpense(this.ExpenseListForm.value).subscribe({
        next: (data) => {
          if (data) {
            this.tostrService.success(
              'Data Added Successfully',
              TostrInterface.middle
            );
            this.spinnerService.hide();
          }
          this.ExpenseListForm.reset();
        },
        error: (error) => {
          this.spinnerService.hide();
          let errorMessage = 'An error occurred. Please try again.';
          if (error instanceof HttpErrorResponse) {
            console.error(
              `Backend returned code ${error.status}, body was: `,
              error.error
            );
            if (error.error instanceof ErrorEvent) {
              console.error('An error occurred:', error.error.message);
            } else {
              errorMessage = `Server error occurred: ${error.message}`;
            }
          } else {
            console.error('An unexpected error occurred:', error);
          }
          this.tostrService.error(errorMessage, TostrInterface.middle);
        },
      });
    } else {
      this.spinnerService.hide();
      console.log('No data from Expense Form.');
    }
  }

  OnChange(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    this.SelectedCategoryId = selectElement.value;
  }

  GetCategory() {
    this.apiservice.GetCategory().subscribe((data) => {
      this.categories = data;
    });
  }

  GetDailyExpenseColumnConfig() {
    this.apiservice.GetUIColumns(this.tableID).subscribe((data) => {
      const columnHeaders: any[] = [];
      data.forEach((value: { ColumnName: any }) => {
        columnHeaders.push(value.ColumnName);
      });
      this.displayedColumns = columnHeaders;
      this.displayedColumnField = data;
      console.log(this.displayedColumnField);
    });
  }

  GetDailyExpenseTableData() {
    const todayDate = this.getCurrentDate();
    this.apiservice
      .GetExpenseListbyDate(todayDate, this.userId)
      .subscribe((data) => {
        if (data != null) {
          this.datasource = data;
        }
      });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  GetRowInfo(data: any) {
    if (data.actionType == 'Edit') {
      //open dialogLog
    } else if (data.actionType == 'Delete') {
      //open dialogLog
    }
  }
}
