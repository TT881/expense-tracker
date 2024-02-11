/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalTitleService } from './globalTitle.service';

describe('Service: GlobalTitle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalTitleService]
    });
  });

  it('should ...', inject([GlobalTitleService], (service: GlobalTitleService) => {
    expect(service).toBeTruthy();
  }));
});
