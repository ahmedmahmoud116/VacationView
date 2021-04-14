import { Component, OnInit } from '@angular/core';
import { EmployeebalanceService } from '../employeebalance.service';
import { Employeebalance } from '../employeebalance';
import { Vacationview } from '../vacationview';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationService } from '../vacation.service';
import { EmployeeService } from '../employee.service';
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

  // loadEmployeeBalanceToEdit(employeeId: number) {
  //   this.employeeService.getEmployeeById(employeeId).subscribe(employee=> {
  //     // this.message = null;
  //     this.dataSaved = false;
  //     this.employeebalanceIdUpdate = employee.id;
  //     this.employeebalanceForm.controls['fullName'].setValue(employee.fullName);
  //     this.employeebalanceForm.controls['birthDate'].setValue(employee.birthDate);
  //     this.employeebalanceForm.controls['email'].setValue(employee.email);
  //     this.employeebalanceForm.controls['gender'].setValue(employee.gender);
  //   });
  // }

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
