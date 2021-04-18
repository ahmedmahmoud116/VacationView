import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeebalanceService } from '../../Services/employeebalance.service';
import { Employeebalance } from '../../Models/employeebalance';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationService } from '../../Services/vacation.service';
import { EmployeeService } from '../../Services/employee.service';
import { ValidatorServiceService } from '../../Services/validator-service.service';
import { Vacation } from 'src/app/Models/vacation';
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
  vacationtype: Vacation;


  constructor(private formbulider: FormBuilder,
              private employeebalanceService:EmployeebalanceService,
              private route: ActivatedRoute,
              private router: Router,
              private vacationService: VacationService,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeebalanceForm = this.formbulider.group({
      employeeid: ['', [Validators.required]],
      vacationid: ['', [Validators.required]],
      balance: ['', [Validators.required, ValidatorServiceService.positiveValidator, ValidatorServiceService.vacatationbalance]]
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

    // if(this.vacationObj != null){
    //   this.vacationtype = this.vacationList.filter(v => v.id == this.vacationObj)[0];
    // }

    // this.ngAfterContentChecked();
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
        () => {
          this.dataSaved = true;
          // this.message = 'Record saved Successfully';
          this.employeebalanceIdUpdate = null;
          // this.employeeForm.reset();
          this.returnToEmployeeBalance();
        }
      );
    } else {
      employeebalance.id = this.employeebalanceIdUpdate;
      this.employeebalanceService.updateEmployeeBalance(employeebalance.id, employeebalance).subscribe(() => {
        this.dataSaved = true;
        this.employeebalanceIdUpdate = null;
        this.returnToEmployeeBalance();
      });
    }
  }

  resetForm() {
    // debugger;
    // this.employeebalanceForm.controls['employeeid'].setValue('');
    // this.employeebalanceForm.controls['vacationid'].setValue('');
    // this.employeebalanceForm.controls['balance'].setValue(5);
    this.employeebalanceForm.reset();
    // this.dataSaved = false;
  }

  returnToEmployeeBalance() {
    this.router.navigate([`employeebalance`]);
  }

  convertValue(type: string){
    return type;
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    if(this.vacationObj != null){
      this.vacationtype = this.vacationList.filter(v => v.id == this.vacationObj)[0];
    }
  }

}
