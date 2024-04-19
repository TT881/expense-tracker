import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validator function
export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startdate = control.get('startdate')?.value;
    const enddate = control.get('enddate')?.value;
    return startdate && enddate && enddate < startdate
      ? { dateRangeInvalid: true }
      : null;
  };
}
