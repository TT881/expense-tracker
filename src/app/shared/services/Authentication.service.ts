import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private router: Router) {}

  login(username: string, password: string) {
    //Call API for login Success
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', '');
    localStorage.setItem('userName', '');
    this.router.navigate(['/dashboard']);
    return true;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
