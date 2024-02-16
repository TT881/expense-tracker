import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}
  configdata: any;

  load() {
    const promise = this.http.get('./assets/config.json').subscribe(
      (data) => {
        Object.assign(this, data);
        this.configdata = data;
        console.log(`Config loaded successfully` + this.configdata['UIAPI']);
        localStorage.setItem('UIAPILINK', this.configdata['UIAPI']);
      },
      (error) => {
        console.error('Failed to load config', error);
      }
    );
    return promise;
  }
}
