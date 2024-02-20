import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { APIService } from './API.service';
import { JsonPipe } from '@angular/common';
import { TostrInterface } from '../Models/TostrInterface';
import { ToastrService } from './toastr.service';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private apiservice: APIService,
    private tostrservice: ToastrService
  ) {}

  login(username: string, password: string) {
    this.apiservice.validateUser(username, password).subscribe({
      next: (data) => {
        if (data != null) {
          console.log(JSON.stringify(data));
          console.log(data[0]['Name']);
          console.log(data[0]['UserId']);
          localStorage.setItem('ExpenseuserData', JSON.stringify(data));
          localStorage.setItem('isExpenseuserLoggedIn', 'true');
          this.router.navigate(['/dashboard']);
          this.tostrservice.success(
            'Welcome back' + ' ' + data[0]['Name'],
            TostrInterface.middle
          );
        } else {
          this.tostrservice.error(
            "Don't have this user in the DB!",
            TostrInterface.middle
          );
        }
      },
      error: (error) => {
        console.log('error' + JSON.stringify(error));
      },
    });
  }

  logout() {
    localStorage.removeItem('ExpenseuserData');
    localStorage.removeItem('isExpenseuserLoggedIn');
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
