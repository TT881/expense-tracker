import { ValidationService } from './../shared/services/Validation.service';
import { DialogService } from './../shared/services/dialog.service';
import { AuthenticationService } from './../shared/services/Authentication.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import exp from 'constants';

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
    private spinnerService: NgxSpinnerService,
    private dialogService: DialogService,
    private validationService: ValidationService
  ) {
    this.initializeForm();
  }
  titleName: string | undefined = 'Expense Management';

  ExpenseListForm!: FormGroup;
  userId!: number;
  typeSelected: string = 'Ball Spin Clockwise';
  @ViewChild('SpreadSS') SpreasSSComp: SpreadSheetComponent | undefined;

  initializeForm(): void {
    this.ExpenseListForm = this.fg.group({
      category: ['', Validators.required],
      date: ['', Validators.required],
      remark: [''],
      cost: ['', Validators.required],
      userID: [localStorage.getItem('ExpenseUserID') || ''],
    });
  }

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
    if (value.valid) {
      const newUserID = localStorage.getItem('ExpenseUserID');
      this.ExpenseListForm.patchValue({
        UserID: newUserID,
      });
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
          this.GetDailyExpenseTableData();
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
      this.tostrService.error(
        'Please fill up all the required fields!',
        TostrInterface.middle
      );
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
    });
  }

  GetDailyExpenseTableData() {
    const todayDate = this.getCurrentDate();
    this.apiservice
      .GetExpenseListbyDate(todayDate, this.userId)
      .subscribe((data) => {
        if (data != null) {
          this.datasource = data;
        } else {
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
    const expenseID = Number(data['data']['ExpenseID']);
    const cost = Number(data['data']['Cost']);
    console.log(expenseID + ',' + cost);
    if (data.actionType == 'Save') {
      this.dialogService
        .openDialog(
          data,
          'ConfirmDialog',
          '400',
          '200',
          'Do you confirm to save the changes?'
        )
        .afterClosed()
        .subscribe((res: any) => {
          if (res) {
            this.apiservice
              .UpdateExpense(expenseID, cost)
              .subscribe((res: any) => {
                if (res['message'] != null) {
                  this.tostrService.success(
                    res['message'],
                    TostrInterface.middle
                  );
                  this.SpreasSSComp?.ResetCrudAction();
                  this.GetDailyExpenseTableData();
                }
              });
          } else {
            return;
          }
        });
    } else if (data.actionType == 'Delete') {
      this.dialogService
        .openDialog(
          data,
          'ConfirmDialog',
          '400',
          '200',
          'Do you confirm to delete this item?'
        )
        .afterClosed()
        .subscribe((res: any) => {
          if (res) {
            this.apiservice
              .DeleteExpense(expenseID, cost)
              .subscribe((res: any) => {
                if (res['message'] != null) {
                  this.tostrService.success(
                    res['message'],
                    TostrInterface.middle
                  );
                  this.SpreasSSComp?.ResetCrudAction();
                  this.GetDailyExpenseTableData();
                }
              });
          } else {
            return;
          }
        });
    }
  }

  ValidateInput() {
    return (row: any, j: any, column: any) => (value: any) =>
      this.validationService.checkSpreadsheetInput(value, row, j, column);
  }
}
