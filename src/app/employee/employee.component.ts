import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm: any;
  allEmployees:any =  [];
  constructor(private formbulider: FormBuilder, private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  loadAllEmployees() {
    this.employeeService.getAllEmployee().subscribe(employee =>{
      console.log(employee);
      this.allEmployees = employee;
    });

  }

  deleteEmployee(employeeId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
    this.employeeService.deleteEmployeeById(employeeId).subscribe(() => {
      // this.dataSaved = true;
      this.loadAllEmployees();
      // this.employeeIdUpdate = null;
      // this.employeeForm.reset();

    });
  }
}

  compare(str1 : string, str2 : string){
    return str1.localeCompare(str2) == 0;
 }
}
