import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardComponent,
    AppComponent,
    //SharedModule,
  ],
  providers: [],
  bootstrap: [],
  exports: [],
})
export class AppModule {}
