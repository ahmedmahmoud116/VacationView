import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private formbulider: FormBuilder,
              private employeeService:EmployeeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.employeeForm = this.formbulider.group({
      fullName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
    this.employeeIdUpdate= this.route.snapshot.params['id'];
  }

  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.CreateEmployee(employee);
    this.employeeForm.reset();
  }

  CreateEmployee(employee: Employee) {
    console.log(this.employeeIdUpdate);
    if (this.employeeIdUpdate == null) {
      this.employeeService.createEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          // this.message = 'Record saved Successfully';
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
        }
      );
    } else {
      employee.id = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee.id, employee).subscribe(() => {
        this.dataSaved = true;
        // this.message = 'Record Updated Successfully';
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      });
    }
  }

  resetForm() {
    this.employeeForm.reset();
    // this.message = null;
    this.dataSaved = false;
  }
}
