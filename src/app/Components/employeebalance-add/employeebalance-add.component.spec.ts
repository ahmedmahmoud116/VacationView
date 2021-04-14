import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeebalanceAddComponent } from './employeebalance-add.component';

describe('EmployeebalanceAddComponent', () => {
  let component: EmployeebalanceAddComponent;
  let fixture: ComponentFixture<EmployeebalanceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeebalanceAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeebalanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
