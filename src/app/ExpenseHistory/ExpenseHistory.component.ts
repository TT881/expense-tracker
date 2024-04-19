import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from '../Dashboard/Dashboard.component';
import { APIService } from '../shared/services/API.service';
import { ToastrService } from 'ngx-toastr';
import { TostrInterface } from '../shared/Models/TostrInterface';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { dateRangeValidator } from './dateRangeValidator';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    RouterModule,
    SharedModule,
    DashboardComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  selector: 'app-ExpenseHistory',
  templateUrl: './ExpenseHistory.component.html',
  styleUrls: ['./ExpenseHistory.component.scss'],
})
export class ExpenseHistoryComponent implements OnInit {
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  displayedColumnField: any;

  startdate: any = new Date();
  dateRangeForm!: FormGroup<any>;

  constructor(private apiservice: APIService, private toastr: ToastrService) {
    this.dateRangeForm = new FormGroup(
      {
        startdate: new FormControl('', [Validators.required]),
        enddate: new FormControl('', [Validators.required]),
      },
      { validators: dateRangeValidator() }
    );
  }

  expensehistoryName = 'Expense History';
  displayedColumns: any[] = [];
  tableID: any = 2;
  datasource: any;
  ngOnInit() {
    this.GetDisplaycolumns();
    this.GetExpenseHistory();
  }

  GetDisplaycolumns() {
    this.apiservice.GetUIColumns(this.tableID).subscribe((data): any => {
      const columnHeaders: any[] = [];
      data.forEach((value: { ColumnName: any }) => {
        columnHeaders.push(value.ColumnName);
      });
      this.displayedColumns = columnHeaders;
      this.displayedColumnField = data;
    });
  }

  GetExpenseHistory(startdate?: any, enddate?: any) {
    const userID = Number(localStorage.getItem('ExpenseUserID'));
    if (startdate && enddate) {
      //Filtering data
    } else {
      this.apiservice.GetExpenseHistory(userID).subscribe((data: any) => {
        console.log(data);
        if (data) {
          this.datasource = data;
        } else {
          this.toastr.warning('No data!', TostrInterface.middle);
        }
      });
    }
  }

  GetRowInfo(data: any) {}

  onDateSubmit() {
    if (this.dateRangeForm.valid) {
      const userID = Number(localStorage.getItem('ExpenseUserID'));
      console.log('Form Submitted!', this.dateRangeForm.value);
      let startdate = new Date(this.dateRangeForm.controls['startdate'].value);
      let endDate = new Date(this.dateRangeForm.controls['enddate'].value);
      let formattedStartDate = this.ConvertDate(startdate);
      let formattedEndDate = this.ConvertDate(endDate);
      this.apiservice
        .FilterExpenseHistory(userID, formattedStartDate, formattedEndDate)
        .subscribe((data: any) => {
          if (data) {
            this.datasource = data;
          } else {
            this.toastr.info('No data was found.');
            this.datasource = [];
          }
        });
    } else {
      this.toastr.error('Date Form is not valid!');
    }
  }

  ConvertDate(date: Date) {
    // const date = new Date(
    //   'Thu Apr 18 2024 08:00:00 GMT+0800 (Singapore Standard Time)'
    // );
    // Extract year, month, and day
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11, adding 1 to adjust to 1-12
    const day = date.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
    return formattedDate;
  }
}
