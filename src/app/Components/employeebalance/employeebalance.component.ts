import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { EmployeebalanceService } from '../../Services/employeebalance.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vacationview } from '../../Models/vacationview';
@Component({
  selector: 'app-employeebalance',
  templateUrl: './employeebalance.component.html',
  styleUrls: ['./employeebalance.component.css']
})
export class EmployeebalanceComponent implements OnInit{
  allVacationviews:any =  [];
  employeebalanceForm: any;
  vacationBalance: any;

  constructor(private employeebalanceService:EmployeebalanceService,
              private router:Router,
              private formbulider: FormBuilder)
              { }

  ngOnInit(): void {
    this.loadAllEmployeebalances();
  }

  ngAfterViewInit(): void {
    this.loadAllEmployeebalances();
  }

  changeEmployeeBalance(vacationviews: Vacationview[]) {
    this.employeebalanceService.updateEmployeeBalances(vacationviews).subscribe(
      () => {
        console.log("vacationview balance: " + vacationviews[2].balance);
        this.loadAllEmployeebalances();
      });
      console.log(this.allVacationviews);
  }

  loadAllEmployeebalances() {
    this.employeebalanceService.getAllEmployeeBalance().subscribe(Vacationview =>{
      this.allVacationviews = Vacationview;
    });
  }

  deleteEmployeebalance(employeebalanceId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
    this.employeebalanceService.deleteEmployeeBalanceById(employeebalanceId).subscribe(() => {
      this.loadAllEmployeebalances();
    });
  }
 }

 convertBalance(balance: number){
  return balance;
 }

  compare(str1 : string, str2 : string){
    return str1.localeCompare(str2) == 0;
 }

 trackByIndex(index: number, obj: any): any {
  return index;
  }

}
