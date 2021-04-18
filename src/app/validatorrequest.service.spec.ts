import { TestBed } from '@angular/core/testing';

import { ValidatorrequestService } from './Services/validatorrequest.service';

describe('ValidatorrequestService', () => {
  let service: ValidatorrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
