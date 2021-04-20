import { Component, OnInit } from '@angular/core';
import { VacationService } from '../../Services/vacation.service';
import { Vacation } from '../../Models/vacation';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorServiceService } from '../../Services/validator-service.service';
import { NotificationService } from 'src/app/Services/notification.service';

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

  errorstatus: number = 200;
  message: string = "Something Went Wrong..";
  title: string = "vacation Form";

  constructor(private formbulider: FormBuilder,
              private vacationservice:VacationService,
              private route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.vacationForm = this.formbulider.group({
      type: ['', [Validators.required]],
      balance: ['', [Validators.required,this.positiveValidator]]
      // type: [''],
      // balance: ['']
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
        data => {
          this.dataSaved = true;
          // this.message = 'Record saved Successfully';
          this.vacationIdUpdate = null;
          // this.employeeForm.reset();
          this.returnToVacation();
        }, error => {
            console.log("error on create: " + error.status);
            this.errorstatus = error.status;
            this.notificationService.showError(this.message, this.title);
        }
      );
    } else {
      vacation.id = this.vacationIdUpdate;
      this.vacationservice.updateVacation(vacation.id, vacation).subscribe(data => {
        this.dataSaved = true;
        // this.message = 'Record Updated Successfully';
        this.vacationIdUpdate = null;
        // this.employeeForm.reset();
        this.returnToVacation();
      }, error => {
        console.log("error on edit: " + error.status);
        this.errorstatus = error.status;
        this.notificationService.showError(this.message, this.title);
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
