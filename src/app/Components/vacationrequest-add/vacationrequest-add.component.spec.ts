import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationrequestAddComponent } from './vacationrequest-add.component';

describe('VacationrequestAddComponent', () => {
  let component: VacationrequestAddComponent;
  let fixture: ComponentFixture<VacationrequestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationrequestAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationrequestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
