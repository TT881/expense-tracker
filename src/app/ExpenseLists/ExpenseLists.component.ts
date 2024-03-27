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

@Component({
  standalone: true,
  selector: 'app-ExpenseLists',
  templateUrl: './ExpenseLists.component.html',
  styleUrls: ['./ExpenseLists.component.scss'],
  imports: [
    CommonModule,
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

  constructor(
    private fg: FormBuilder,
    private apiservice: APIService,
    private authservice: AuthenticationService,
    private tostrService: ToastrService
  ) {}
  titleName: string | undefined = 'Expense Management';

  ExpenseListForm!: FormGroup;

  ngOnInit() {
    this.GetCategory();

    this.ExpenseListForm = this.fg.group({
      category: ['', Validators.required],
      date: ['', Validators.required],
      Remark: [''],
      Cost: ['', Validators.required],
      UserID: [localStorage.getItem('ExpenseUserID')],
    });
  }

  country1 = 1;

  onSubmit(value: any) {
    if (value) {
      this.apiservice.SubmitExpense(this.ExpenseListForm.value).subscribe({
        next: (data) => {
          if (data) {
            this.tostrService.success(
              'Data Added Successfully',
              TostrInterface.middle
            );
          }
          this.ExpenseListForm.reset();
        },
        error: (error) => {
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
}
