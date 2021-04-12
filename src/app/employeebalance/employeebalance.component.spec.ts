import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeebalanceComponent } from './employeebalance.component';

describe('EmployeebalanceComponent', () => {
  let component: EmployeebalanceComponent;
  let fixture: ComponentFixture<EmployeebalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeebalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeebalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
