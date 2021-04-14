import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationrequestComponent } from './vacationrequest.component';

describe('VacationrequestComponent', () => {
  let component: VacationrequestComponent;
  let fixture: ComponentFixture<VacationrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
