import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalTitleService {
  constructor() {}

  public titleNameSource = new BehaviorSubject<string>('My DashBoard');
  $titleName = this.titleNameSource.asObservable();

  setName(titleName: string) {
    this.titleNameSource.next(titleName);
  }
}
