import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthenticationService } from '../shared/services/Authentication.service';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  standalone: true,
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule, NgxSpinnerModule],
})
export class LoginComponent implements OnInit {
  loginModel = {
    username: '',
    password: '',
  };
  typeSelected: string = 'Ball Spin Clockwise';
  constructor(
    private _authservice: AuthenticationService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this._authservice.login(form.value.username, form.value.password);
    }
  }

  ngOnInit() {}
}
