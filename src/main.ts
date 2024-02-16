import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app/app-routing.module';
import { EXPENSE_ROUTES } from './app/expenses-route';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from './app/app-module';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AppModule,
      BrowserAnimationsModule, // For animations
      AppRoutingModule, //  consolidated routing configuration
      HttpClientModule
    ),
  ],
}).catch((err) => console.error(err));

if (environment.production) {
  enableProdMode();
}
