import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
