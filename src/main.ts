import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app/app-routing.module';
import { EXPENSE_ROUTES } from './app/expenses-route';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule, // For animations
      AppRoutingModule, // Your consolidated routing configuration
      HttpClientModule // Include this if you're using HTTP in your app
    ),
  ],
}).catch((err) => console.error(err));
