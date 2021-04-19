import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm: any;
  allEmployees:any =  [];
  constructor(private formbulider: FormBuilder, private employeeService:EmployeeService, private router:Router) { }

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  loadAllEmployees() {
    this.employeeService.getAllEmployee().subscribe(employee =>{
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

 sendEmployeeToEdit(employeeID: number){
  this.router.navigate([`employeeAdd/${employeeID}`]);
 }

  compare(str1 : string, str2 : string){
    return str1.localeCompare(str2) == 0;
 }
}
