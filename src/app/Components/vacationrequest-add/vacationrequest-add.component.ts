import { Component, OnInit } from '@angular/core';
import { VacationrequestService } from '../../Services/vacationrequest.service';
import { Vacationrequest } from '../../Models/vacationrequest';
import { FormBuilder, NgForm, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationService } from '../../Services/vacation.service';
import { EmployeeService } from '../../Services/employee.service';
import { EmployeebalanceService } from '../../Services/employeebalance.service';
import { ValidatorrequestService } from 'src/app/Services/validatorrequest.service';
import { Vacationview } from 'src/app/Models/vacationview';
import { ValidatorServiceService } from 'src/app/Services/validator-service.service';
import { ControlMessagesComponent } from '../control-messages/control-messages.component';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-vacationrequest-add',
  templateUrl: './vacationrequest-add.component.html',
  styleUrls: ['./vacationrequest-add.component.css']
})
export class VacationrequestAddComponent implements OnInit {

  allVacationrequests:any =  [];
  vacationrequestForm: any;
  dataSaved = false;
  vacationrequestIdUpdate = null as any;
  vacationList: any;
  employeeList: any;

  employeeObj: any;
  vacationObj: any;
  static vacationObjst: any;
  static employeeObjst: any;

  allVacationviews: any = [];
  static vacationview: Vacationview = null;
  static editDays:number;
  static vacatationIDEdit: number = 0;
  static _errormessage: string = null;

  errorstatus: number = 200;
  message: string = "Something Went Wrong..";
  title: string = "vacation Form";

  constructor(private formbulider: FormBuilder,
              private vacationrequestservice: VacationrequestService,
              private route: ActivatedRoute,
              private router: Router,
              private vacationService: VacationService,
              private employeeService: EmployeeService,
              private employeebalanceService: EmployeebalanceService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.vacationrequestForm = this.formbulider.group({
      // employeeid: ['', [Validators.required]],
      // vacationid: ['', [Validators.required]],
      // days: ['', [Validators.required, this.positiveValidator, this.vacatationdays]]
      employeeid: [''],
      vacationid: [''],
      days: ['']
    });
    // this.employeebalanceIdUpdate= this.route.snapshot.params['id'];
    // if(this.employeebalanceIdUpdate != null)
    //   this.loadEmployeeBalanceToEdit(this.employeebalanceIdUpdate);
    this.vacationService.getAllVacation().subscribe(vacation =>{
      this.vacationList = vacation;
    });;
    this.employeeService.getAllEmployee().subscribe(employee =>{
      this.employeeList = employee;
    });;

    this.vacationrequestIdUpdate= this.route.snapshot.params['id'];
    if(this.vacationrequestIdUpdate != null)
      this.loadvacationrequestToEdit(this.vacationrequestIdUpdate);

    this.loadAllVacationviews();

    VacationrequestAddComponent.vacatationIDEdit = this.vacationrequestIdUpdate;
    VacationrequestAddComponent.vacationObjst = this.vacationObj;
    VacationrequestAddComponent.employeeObjst = this.employeeObj;
  }

  onFormSubmit() {
    this.dataSaved = false;
    const vacationrequest = this.vacationrequestForm.value;
    this.CreateVacationRequest(vacationrequest);
    // this.employeeForm.reset();
  }

  CreateVacationRequest(vacationrequest: Vacationrequest) {
    if (this.vacationrequestIdUpdate == null) {
      this.vacationrequestservice.createVacationRequest(vacationrequest).subscribe(
        data => {
          this.dataSaved = true;
          // this.message = 'Record saved Successfully';
          this.vacationrequestIdUpdate = null;
          // this.employeeForm.reset();
          this.returnToVacationRequest();
        },error => {
          console.log("error on create: " + error.status);
          this.errorstatus = error.status;
          this.notificationService.showError(this.message, this.title);
      }
      );
    } else {
      vacationrequest.id = this.vacationrequestIdUpdate;
      this.vacationrequestservice.updateVacationRequest(vacationrequest.id, vacationrequest).subscribe(data => {
        this.dataSaved = true;
        // this.message = 'Record Updated Successfully';
        this.vacationrequestIdUpdate = null;
        // this.employeeForm.reset();
        this.returnToVacationRequest();
      }, error => {
        console.log("error on edit: " + error.status);
        this.errorstatus = error.status;
        this.notificationService.showError(this.message, this.title);
    });
    }
  }

  loadvacationrequestToEdit(vacationrequestId: number) {
    this.vacationrequestservice.getVacationRequestById(vacationrequestId).subscribe(vacationrequest=> {
      this.dataSaved = false;
      this.vacationrequestIdUpdate = vacationrequest.id;
      this.vacationrequestForm.controls['employeeid'].setValue(vacationrequest.employeeID);
      this.vacationrequestForm.controls['vacationid'].setValue(vacationrequest.vacationID);
      this.vacationrequestForm.controls['days'].setValue(vacationrequest.days);
      VacationrequestAddComponent.editDays = vacationrequest.days;
    });
  }

  resetForm() {
    this.vacationrequestForm.reset();
    // this.message = null;
    this.dataSaved = false;
  }

  returnToVacationRequest() {
    this.router.navigate([`vacationrequest`]);
  }

  convertValue(type: string){
    return type;
  }

  ngDoCheck(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log("state " + this.vacationrequestForm.controls['days'].status);
    if(this.vacationObj != null && this.employeeObj != null){
      VacationrequestAddComponent.vacationview = this.allVacationviews.filter(v => (v.employeeID == this.employeeObj && v.vacationID == this.vacationObj))[0];
    }
    if(this.positiveValidator(this.vacationrequestForm.controls['days']) == null)
      this.vacatationdays(this.vacationrequestForm.controls['days']);
    else
      this.positiveValidator(this.vacationrequestForm.controls['days']);
  }

  loadAllVacationviews() {
    this.employeebalanceService.getAllEmployeeBalance().subscribe(Vacationview =>{
      this.allVacationviews = Vacationview;
    });
  }


  /**validators Functions **/
  vacatationdays(control) {
      let currval = VacationrequestAddComponent.editDays;
      if(control.value !== '' && VacationrequestAddComponent.vacationview == null){
        VacationrequestAddComponent._errormessage = '';
        return 'error';
      }
      if(VacationrequestAddComponent.vacationview != null && control.value !== ''){
        if(VacationrequestAddComponent.vacatationIDEdit == null){
          if (
            control.value <= (+VacationrequestAddComponent.vacationview.balance - +VacationrequestAddComponent.vacationview.used)
          ) {
            VacationrequestAddComponent._errormessage = null;
            return null;
          } else {
            VacationrequestAddComponent._errormessage = `days must be lower than ${+VacationrequestAddComponent.vacationview.balance - +VacationrequestAddComponent.vacationview.used + +1}`;
            return `days must be lower than ${+VacationrequestAddComponent.vacationview.balance - +VacationrequestAddComponent.vacationview.used + +1}`;
          }
        }
        else{
          if (
            control.value <= (+VacationrequestAddComponent.vacationview.balance - (+VacationrequestAddComponent.vacationview.used - +currval))
          ) {
            VacationrequestAddComponent._errormessage = null;
            return null;
          } else {
            VacationrequestAddComponent._errormessage = `days must be lower than ${+VacationrequestAddComponent.vacationview.balance - (+VacationrequestAddComponent.vacationview.used - +VacationrequestAddComponent.editDays) + +1}`;
            return `days must be lower than ${+VacationrequestAddComponent.vacationview.balance - (+VacationrequestAddComponent.vacationview.used - +VacationrequestAddComponent.editDays) + +1}`;
          }

        }
      }
      else
        VacationrequestAddComponent._errormessage = '';
        return '';
  }

  positiveValidator(control) {
    // RFC 2822 compliant regex
    if (
      String(control.value).match(/^[1-9]+[0-9]*$/)
    ) {
      VacationrequestAddComponent._errormessage = null;
      return null;
    } else {
      VacationrequestAddComponent._errormessage = 'Invalid Number';
      return 'Invalid Number';
    }
  }

  get errormessage(){
    return VacationrequestAddComponent._errormessage;
  }

}
