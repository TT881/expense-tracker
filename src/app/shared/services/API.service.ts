import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  UserapiURL: string | null = localStorage.getItem('UIAPILINK') + '/api/User';
  params: HttpParams | undefined;

  constructor(private http: HttpClient) {}

  validateUser(username: string, password: string): Observable<any> {
    const url = `${this.UserapiURL}/ValidateUser`;
    const body = { username: username, password: password };
    return this.http.post<any>(url, body);
  }

  AddUser(username: string, password: string): Observable<any> {
    const url = `${this.UserapiURL}/AddUser`;
    const body = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.post(url, body, { headers });
  }
}
