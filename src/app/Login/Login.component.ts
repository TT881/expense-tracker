import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthenticationService } from '../shared/services/Authentication.service';

@Component({
  standalone: true,
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  loginModel = {
    username: '',
    password: '',
  };

  constructor(private _authservice: AuthenticationService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this._authservice.login(form.value.username, form.value.password);
    }
  }
  ngOnInit() {}
}
