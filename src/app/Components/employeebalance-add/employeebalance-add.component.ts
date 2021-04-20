import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeebalanceService } from '../../Services/employeebalance.service';
import { Employeebalance } from '../../Models/employeebalance';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationService } from '../../Services/vacation.service';
import { EmployeeService } from '../../Services/employee.service';
import { ValidatorServiceService } from '../../Services/validator-service.service';
import { Vacation } from 'src/app/Models/vacation';
import { NotificationService } from 'src/app/Services/notification.service';
@Component({
  selector: 'app-employeebalance-add',
  templateUrl: './employeebalance-add.component.html',
  styleUrls: ['./employeebalance-add.component.css']
})
export class EmployeebalanceAddComponent implements OnInit {
  allEmployeebalances:any =  [];
  employeebalanceForm: any;
  dataSaved = false;
  employeebalanceIdUpdate = null as any;
  vacationList: any;
  employeeList: any;
  vacationObj: any;


  static vacationObjst: any;
  static vacationtype: Vacation = null;
  static editDays:number;
  static vacatationIDEdit: number = 0;
  static _errormessage: string = null;

  errorstatus: number = 200;
  message: string = "Something Went Wrong..";
  title: string = "vacation Form";

  constructor(private formbulider: FormBuilder,
              private employeebalanceService:EmployeebalanceService,
              private route: ActivatedRoute,
              private router: Router,
              private vacationService: VacationService,
              private employeeService: EmployeeService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.employeebalanceForm = this.formbulider.group({
      employeeid: ['', [Validators.required]],
      vacationid: ['', [Validators.required]],
      balance: ['', [Validators.required, this.positiveValidator, this.vacatationbalance]]
      // employeeid: [''],
      // vacationid: [''],
      // balance: ['']
    });
    // this.employeebalanceIdUpdate= this.route.snapshot.params['id'];
    // if(this.employeebalanceIdUpdate != null)
    //   this.loadEmployeeBalanceToEdit(this.employeebalanceIdUpdate);
    this.vacationService.getAllVacation().subscribe(vacation =>{
      this.vacationList = vacation;
    });
    this.employeeService.getAllEmployee().subscribe(employee =>{
      this.employeeList = employee;
    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const employeebalance = this.employeebalanceForm.value;
    this.CreateEmployeeBalance(employeebalance);
    // this.employeeForm.reset();
  }

  CreateEmployeeBalance(employeebalance: Employeebalance) {
    console.log(employeebalance);
    if (this.employeebalanceIdUpdate == null) {
      this.employeebalanceService.createEmployeeBalance(employeebalance).subscribe(
        data => {
          this.dataSaved = true;
          // this.message = 'Record saved Successfully';
          this.employeebalanceIdUpdate = null;
          // this.employeeForm.reset();
          this.returnToEmployeeBalance();
        }, error => {
          console.log("error on create: " + error.status);
          this.errorstatus = error.status;
          this.notificationService.showError(this.message, this.title);
        }
      );
    } else {
      employeebalance.id = this.employeebalanceIdUpdate;
      this.employeebalanceService.updateEmployeeBalance(employeebalance.id, employeebalance).subscribe(data => {
        this.dataSaved = true;
        this.employeebalanceIdUpdate = null;
        this.returnToEmployeeBalance();
      }, error =>{
        console.log("error on edit: " + error.status);
        this.errorstatus = error.status;
        this.notificationService.showError(this.message, this.title);
      }
      );
    }
  }

  resetForm() {
    this.employeebalanceForm.reset();
  }

  returnToEmployeeBalance() {
    this.router.navigate([`employeebalance`]);
  }

  convertValue(type: string){
    return type;
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if(this.vacationObj != null){
      EmployeebalanceAddComponent.vacationtype = this.vacationList.filter(v => v.id == this.vacationObj)[0];
    }
    if(this.positiveValidator(this.employeebalanceForm.controls['balance']) == null)
      this.vacatationbalance(this.employeebalanceForm.controls['balance']);
    else
      this.positiveValidator(this.employeebalanceForm.controls['balance']);
  }


  /**validator Functions **/
  vacatationbalance(control) {

    if(control.value !== '' && EmployeebalanceAddComponent.vacationtype == null){
      EmployeebalanceAddComponent._errormessage = '';
      return 'error';
    }
    if(EmployeebalanceAddComponent.vacationtype !== null && control.value !== ''){
      if (
        control.value <= EmployeebalanceAddComponent.vacationtype.balance
      ) {
        EmployeebalanceAddComponent._errormessage = null;
        return null;
      } else {
        EmployeebalanceAddComponent._errormessage = `Balance must be lower than ${EmployeebalanceAddComponent.vacationtype.balance}`;
        return `Balance must be lower than ${EmployeebalanceAddComponent.vacationtype.balance}`;
      }
    }
    else
      EmployeebalanceAddComponent._errormessage = null;
      return null;
  }

  positiveValidator(control) {
    // RFC 2822 compliant regex
    if (
      String(control.value).match(/^[1-9]+[0-9]*$/)
    ) {
      EmployeebalanceAddComponent._errormessage = null;
      return null;
    } else {
      EmployeebalanceAddComponent._errormessage = 'Invalid Number';
      return 'Invalid Number';
    }
  }

  get errormessage(){
    return EmployeebalanceAddComponent._errormessage;
  }

}
