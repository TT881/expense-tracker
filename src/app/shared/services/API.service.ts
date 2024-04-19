import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  UserapiURL: string | null = localStorage.getItem('UIAPILINK') + '/api/User';
  ExpenseapiURL: string | null =
    localStorage.getItem('UIAPILINK') + '/api/Expense';
  UiURL: string | null = localStorage.getItem('UIAPILINK') + '/api/UIConfig';
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

  SubmitExpense(ExpenseForm: FormData): Observable<any> {
    return this.http.post(`${this.ExpenseapiURL}/AddExpense`, ExpenseForm);
  }

  GetCategory(): Observable<any> {
    return this.http.get<any>(`${this.ExpenseapiURL}/GetExpenseCategory`);
  }

  GetUIColumns(tableID: any): Observable<any> {
    return this.http.get<any[]>(
      `${this.UiURL}/GetUIColumnConfig?tableId=${tableID}`
    );
  }

  GetExpenseListbyDate(date: any, userId: number): Observable<any> {
    return this.http.get<any>(
      `${this.ExpenseapiURL}/GetExpenseListbyDate?date=${date}&userID=${userId}`
    );
  }

  UpdateExpense(expenseID: number, cost: number): Observable<any> {
    const url = `${this.ExpenseapiURL}/UpdateExpenseList`;
    const body = JSON.stringify({ expenseID, cost });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.patch(url, body, { headers });
  }

  DeleteExpense(expenseID: number, cost: number): Observable<any> {
    const url = `${this.ExpenseapiURL}/DeleteExpenseList`;
    const body = JSON.stringify({ expenseID, cost });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = {
      headers: headers,
      body: body, //Including the body in the options for the delete request
    };
    return this.http.delete(url, options);
  }

  GetExpenseHistory(userID: number): Observable<any> {
    return this.http.get<any[]>(
      `${this.ExpenseapiURL}/GetExpenseHistory?userID=${userID}`
    );
  }

  FilterExpenseHistory(
    userID: number,
    startdate: any,
    enddate: any
  ): Observable<any> {
    return this.http.get<any[]>(
      `${this.ExpenseapiURL}/FilterExpenseHistory?userID=${userID}&startdate=${startdate}&enddate=${enddate}`
    );
  }
}
