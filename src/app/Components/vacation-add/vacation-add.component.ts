import { Component, OnInit } from '@angular/core';
import { VacationService } from '../../Services/vacation.service';
import { Vacation } from '../../Models/vacation';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorServiceService } from '../../Services/validator-service.service';

@Component({
  selector: 'app-vacation-add',
  templateUrl: './vacation-add.component.html',
  styleUrls: ['./vacation-add.component.css']
})
export class VacationAddComponent implements OnInit {
  allVacations:any =  [];
  vacationForm: any;
  dataSaved = false;
  vacationIdUpdate = null as any;

  static _errormessage: string = null;

  constructor(private formbulider: FormBuilder,
              private vacationservice:VacationService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.vacationForm = this.formbulider.group({
      type: ['', [Validators.required]],
      balance: ['', [Validators.required,this.positiveValidator]]
    });
    this.vacationIdUpdate= this.route.snapshot.params['id'];
    if(this.vacationIdUpdate != null)
      this.loadVacationToEdit(this.vacationIdUpdate);
  }

  onFormSubmit() {
    // this.dataSaved = false;
    const vacation = this.vacationForm.value;
    this.CreateVacation(vacation);
    // this.employeeForm.reset();
  }

  CreateVacation(vacation: Vacation) {
    console.log(this.vacationIdUpdate);
    if (this.vacationIdUpdate == null) {
      this.vacationservice.createVacation(vacation).subscribe(
        () => {
          this.dataSaved = true;
          // this.message = 'Record saved Successfully';
          this.vacationIdUpdate = null;
          // this.employeeForm.reset();
          this.returnToVacation();
        }
      );
    } else {
      vacation.id = this.vacationIdUpdate;
      this.vacationservice.updateVacation(vacation.id, vacation).subscribe(() => {
        this.dataSaved = true;
        // this.message = 'Record Updated Successfully';
        this.vacationIdUpdate = null;
        // this.employeeForm.reset();
        this.returnToVacation();
      });
    }
  }

  loadVacationToEdit(employeeId: number) {
    this.vacationservice.getVacationById(employeeId).subscribe(employee=> {
      // this.message = null;
      this.dataSaved = false;
      this.vacationIdUpdate = employee.id;
      this.vacationForm.controls['type'].setValue(employee.type);
      this.vacationForm.controls['balance'].setValue(employee.balance);
    });
  }

  resetForm() {
    this.vacationForm.reset();
    // this.message = null;
    this.dataSaved = false;
  }

  returnToVacation() {
    this.router.navigate([`vacation`]);
  }

  /**validator functions */
  positiveValidator(control) {
    // RFC 2822 compliant regex
    if (
      String(control.value).match(/^[1-9]+[0-9]*$/)
    ) {
      VacationAddComponent._errormessage = null;
      return null;
    } else {
      VacationAddComponent._errormessage = 'Invalid Number';
      return 'Invalid Number';
    }
  }

  get errormessage(){
    return VacationAddComponent._errormessage;
  }
}
