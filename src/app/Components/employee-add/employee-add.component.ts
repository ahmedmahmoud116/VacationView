import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from '../../Models/employee';
import { FormBuilder, NgForm, Validators, FormGroup, FormControl, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iif } from 'rxjs';
import { ValidatorServiceService } from '../../Services/validator-service.service';
import { ControlMessagesComponent } from '../control-messages/control-messages.component';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})

export class EmployeeAddComponent implements OnInit {
  allEmployees:any =  [];
  employeeForm: any;
  dataSaved = false;
  employeeIdUpdate = null as any;

  static _errormessage: string = null;

  constructor(private formbulider: FormBuilder,
              private employeeService:EmployeeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = this.formbulider.group({
      fullName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, this.emailValidator]],
      gender: ['', [Validators.required]],
    });
    this.employeeIdUpdate= this.route.snapshot.params['id'];
    if(this.employeeIdUpdate != null)
      this.loadEmployeeToEdit(this.employeeIdUpdate);
  }

  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.CreateEmployee(employee);
    // this.employeeForm.reset();
  }

  CreateEmployee(employee: Employee) {
    console.log(this.employeeIdUpdate);
    if (this.employeeIdUpdate == null) {
      this.employeeService.createEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          // this.message = 'Record saved Successfully';
          this.employeeIdUpdate = null;
          // this.employeeForm.reset();
          this.returnToEmployee();
        }
      );
    } else {
      employee.id = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee.id, employee).subscribe(() => {
        this.dataSaved = true;
        // this.message = 'Record Updated Successfully';
        this.employeeIdUpdate = null;
        // this.employeeForm.reset();
        this.returnToEmployee();
      });
    }
  }

  loadEmployeeToEdit(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(employee=> {
      // this.message = null;
      this.dataSaved = false;
      this.employeeIdUpdate = employee.id;
      this.employeeForm.controls['fullName'].setValue(employee.fullName);
      this.employeeForm.controls['birthDate'].setValue(employee.birthDate);
      this.employeeForm.controls['email'].setValue(employee.email);
      this.employeeForm.controls['gender'].setValue(employee.gender);
    });
  }

  resetForm() {
    this.employeeForm.reset();
    // this.message = null;
    this.dataSaved = false;
  }

  returnToEmployee() {
    this.router.navigate([`employee`]);
  }

  /**Validator Functions */
  emailValidator(control) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      EmployeeAddComponent._errormessage = null;
      return null;
    } else {
      EmployeeAddComponent._errormessage ='Invalid email address';
      return 'Invalid email address';
    }
  }

  get errormessage(){
    return EmployeeAddComponent._errormessage;
  }

}
