import { TostrInterface } from './../Models/TostrInterface';
import { Injectable } from '@angular/core';
import { equal } from 'assert';
import { ToastrService as NgxToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastr: NgxToastrService) {}

  success(message: string, positionClass: TostrInterface) {
    this.toastr.success(message, '', {
      positionClass: positionClass,
    });
  }

  warning(message: string, positionClass: TostrInterface) {
    this.toastr.warning(message, '', {
      positionClass: positionClass,
    });
  }

  error(message: string, positionClass: TostrInterface) {
    this.toastr.error(message, '', {
      positionClass: positionClass,
    });
  }

  info(message: string, positionClass: TostrInterface) {
    this.toastr.info(message, '', {
      positionClass: positionClass,
    });
  }
}
