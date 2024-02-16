import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  NavigationEnd,
  NavigationError,
  Router,
  RouterEvent,
} from '@angular/router';
import { AuthenticationService } from '../services/Authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  isSmallScreen: Observable<boolean> | undefined;
  activeLink: string | undefined = 'My DashBoard';
  @Input() titleName: string | undefined;

  constructor(
    private breakpointob: BreakpointObserver,
    private router: Router,
    private _authService: AuthenticationService
  ) {
    this.isSmallScreen = this.breakpointob
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches));
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.urlAfterRedirects;
      }
      if (event instanceof NavigationError) {
        console.log('Navigation Error:', event.error);
      }
    });
  }
  Name: string = 'Ting Ting';

  Signout() {
    this._authService.logout();
  }

  ngOnInit(): void {}
}
