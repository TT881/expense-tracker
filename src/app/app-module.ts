import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfigService } from './shared/services/Config.service';

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
