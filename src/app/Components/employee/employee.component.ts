import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm: any;
  allEmployees:any =  [];
  errorstatus: number = 200;
  message: string = "Something Went Wrong..";
  title: string = "Vacation Form"
  constructor(private formbulider: FormBuilder,
              private employeeService:EmployeeService,
              private router:Router,
              private notificationService: NotificationService) { }

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
    this.employeeService.deleteEmployeeById(employeeId).subscribe(data => {
      // this.dataSaved = true;
      this.loadAllEmployees();
      // this.employeeIdUpdate = null;
      // this.employeeForm.reset();
    },error => {
      console.log("error on delete: " + error.status);
      this.errorstatus = error.status;
      this.notificationService.showError(this.message, this.title);
    }
    );
  }
 }

 sendEmployeeToEdit(employeeID: number){
  this.router.navigate([`employeeAdd/${employeeID}`]);
 }

  compare(str1 : string, str2 : string){
    return str1.localeCompare(str2) == 0;
 }
}
