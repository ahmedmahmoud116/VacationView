import { TestBed } from '@angular/core/testing';

import { EmployeebalanceService } from './employeebalance.service';

describe('EmployeebalanceService', () => {
  let service: EmployeebalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeebalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
