import { ToastrService } from './../shared/services/toastr.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { APIService } from '../shared/services/API.service';
import { TostrInterface } from '../shared/Models/TostrInterface';

@Component({
  standalone: true,
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class SignUpComponent implements OnInit {
  constructor(
    private apiservice: APIService,
    private tostr: ToastrService,
    private router: Router
  ) {}

  SignUpModel = {
    username: '',
    password: '',
    retypepw: '',
  };

  get passwordsMatch(): boolean {
    return this.SignUpModel.password === this.SignUpModel.retypepw;
  }

  OnSignUp(form: NgForm) {
    if (this.passwordsMatch && form.valid) {
      const username = form.value.username;
      const password = form.value.password;
      this.apiservice.AddUser(username, password).subscribe((data) => {
        console.log(data);
        if (data.errormessage != null) {
          this.tostr.error(data.errormessage, TostrInterface.middle);
        }
        if (data.warningmessage != null) {
          this.tostr.warning(data.warningmessage, TostrInterface.middle);
        }
        if (data.success != null) {
          this.tostr.success(data.success, TostrInterface.middle);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
  ngOnInit() {}
}
