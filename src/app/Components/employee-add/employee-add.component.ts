import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from '../../Models/employee';
import { FormBuilder, NgForm, Validators, FormGroup, FormControl, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';

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
  errorstatus: number = 200;
  message: string = "Something Went Wrong..";
  title: string = "vacation Form";

  static _errormessage: string = null;

  constructor(private formbulider: FormBuilder,
              private employeeService:EmployeeService,
              private route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.employeeForm = this.formbulider.group({
      fullName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, this.emailValidator]],
      gender: ['', [Validators.required]],
      // fullName: [''],
      // birthDate: [''],
      // email: [''],
      // gender: [''],
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
      let response = this.employeeService.createEmployee(employee).subscribe(
        data => {
          this.employeeIdUpdate = null;
          // this.employeeForm.reset();
          this.returnToEmployee();
        }
        , error => {
          console.log("error on create: " + error.status);
          this.errorstatus = error.status;
          this.notificationService.showError(this.message, this.title);
        }
      );
    } else {
      employee.id = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee.id, employee).subscribe(data => {
        this.dataSaved = true;
        // this.message = 'Record Updated Successfully';
        this.employeeIdUpdate = null;
        // this.employeeForm.reset();
        this.returnToEmployee();
      }, error => {
        console.log("error on edit: " + error.status);
        this.errorstatus = error.status;
        this.notificationService.showError(this.message, this.title);
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
