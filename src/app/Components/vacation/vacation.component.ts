import { Component, OnInit } from '@angular/core';
import { VacationService } from '../../Services/vacation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
  allVacations:any =  [];

  errorstatus: number = 200;
  message: string = "Something Went Wrong..";
  title: string = "vacation Form";

  constructor(private vacationservice:VacationService,
              private router:Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadAllVacations();
  }

  loadAllVacations() {
    this.vacationservice.getAllVacation().subscribe(vacation =>{
      this.allVacations = vacation;
    });

  }

  deleteVacation(vacationId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
    this.vacationservice.deleteVacationById(vacationId).subscribe(data => {
      this.loadAllVacations();
    },error => {
      console.log("error on delete: " + error.status);
      this.errorstatus = error.status;
      this.notificationService.showError(this.message, this.title);
  });
  }
 }

 sendVacationToEdit(vacationID: number){
  this.router.navigate([`vacationAdd/${vacationID}`]);
 }

  compare(str1 : string, str2 : string){
    return str1.localeCompare(str2) == 0;
 }

}
