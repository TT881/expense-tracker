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
import { BrowserModule } from '@angular/platform-browser';
import { validateBasis } from '@angular/flex-layout';

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
  ],
})
export class ExpenseListsComponent implements OnInit {
  constructor(private fg: FormBuilder) {}
  titleName: string | undefined = 'Expense Management';

  ExpenseListForm!: FormGroup;

  ngOnInit() {
    this.ExpenseListForm = this.fg.group({
      category: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      Remark: [''],
      Cost: ['', Validators.required],
    });
  }

  countries = [
    {
      id: 'us',
      name: 'United States',
    },
    {
      id: 'uk',
      name: 'United Kingdom',
    },
    {
      id: 'ca',
      name: 'Canada',
    },
  ];
  country1 = 'ca';
}
