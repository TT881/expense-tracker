import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app-routing';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

// bootstrapApplication(AppComponent, appConfig).catch((err) =>
//   console.error(err)
// );

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(APP_ROUTES))],
});
