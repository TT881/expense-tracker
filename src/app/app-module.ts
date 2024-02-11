import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    DashboardComponent,
    AppComponent,
  ],
  providers: [],
  bootstrap: [],
  exports: [],
})
export class AppModule {}
