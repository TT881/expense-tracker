/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidationService } from './Validation.service';

describe('Service: Validation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationService]
    });
  });

  it('should ...', inject([ValidationService], (service: ValidationService) => {
    expect(service).toBeTruthy();
  }));
});
