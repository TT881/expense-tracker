import { Injectable } from '@angular/core';
import { CanActivateFn, NavigationEnd, Router } from '@angular/router';
import { APIService } from './API.service';
import { JsonPipe } from '@angular/common';
import { TostrInterface } from '../Models/TostrInterface';
import { ToastrService } from './toastr.service';
import { filter } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private apiservice: APIService,
    private tostrservice: ToastrService,
    private spinnerservice: NgxSpinnerService
  ) {}

  login(username: string, password: string) {
    this.spinnerservice.show();
    this.apiservice.validateUser(username, password).subscribe({
      next: (data) => {
        if (data != null) {
          this.spinnerservice.hide();
          localStorage.setItem('ExpenseUserName', data[0]['Name']);
          localStorage.setItem('ExpenseUserID', data[0]['UserId']);
          localStorage.setItem('isExpenseuserLoggedIn', 'true');
          this.router.navigate(['/dashboard']);
          this.tostrservice.success(
            'Welcome back' + ' ' + data[0]['Name'],
            TostrInterface.middle
          );
        } else {
          this.spinnerservice.hide();
          this.tostrservice.error(
            "Don't have this user in the DB!\n Please sign up first.",
            TostrInterface.middle
          );
        }
      },
      error: (error) => {
        this.spinnerservice.hide();
        console.log('error' + JSON.stringify(error));
      },
    });
  }

  logout() {
    localStorage.removeItem('isExpenseuserLoggedIn');
    localStorage.removeItem('ExpenseUserName');
    localStorage.removeItem('ExpenseUserID');
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('isExpenseuserLoggedIn') === 'true';
  }

  nagLogin() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects.includes('/login')) {
          this.logout();
        }
      });
  }
}
