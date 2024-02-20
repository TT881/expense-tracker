import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfigService } from './shared/services/Config.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Login/Login.component';
import { ToastrModule } from 'ngx-toastr';

export const configFactory = (configService: ConfigService) => {
  return () => configService.load();
};

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    DashboardComponent,
    AppComponent,
    FormsModule,
    ToastrModule.forRoot({
      // global Toastr options
      timeOut: 3000,
      positionClass: 'custom-toast-position', //Middle
      preventDuplicates: true,
    }),
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [],
  exports: [],
})
export class AppModule {}
