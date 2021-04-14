import { TestBed } from '@angular/core/testing';

import { VacationrequestService } from './Services/vacationrequest.service';

describe('VacationrequestService', () => {
  let service: VacationrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
