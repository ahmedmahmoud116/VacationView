import { Component, OnInit } from '@angular/core';
import { EmployeebalanceService } from '../../Services/employeebalance.service';
import { Employeebalance } from '../../Models/employeebalance';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationService } from '../../Services/vacation.service';
import { EmployeeService } from '../../Services/employee.service';
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
      balance: ['', [Validators.required]]
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
        // this.message = 'Record Updated Successfully';
        this.employeebalanceIdUpdate = null;
        // this.employeeForm.reset();
        this.returnToEmployeeBalance();
      });
    }
  }

  resetForm() {
    this.employeebalanceForm.reset();
    // this.message = null;
    this.dataSaved = false;
  }

  returnToEmployeeBalance() {
    this.router.navigate([`employeebalance`]);
  }

  convertValue(type: string){
    return type;
  }

}
