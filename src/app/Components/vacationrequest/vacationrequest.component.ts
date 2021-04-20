import { Component, OnInit } from '@angular/core';
import { VacationrequestService } from '../../Services/vacationrequest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-vacationrequest',
  templateUrl: './vacationrequest.component.html',
  styleUrls: ['./vacationrequest.component.css']
})
export class VacationrequestComponent implements OnInit {
  allVacationrequestviews:any =  [];

  errorstatus: number = 200;
  message: string = "Something Went Wrong..";
  title: string = "vacation Form";

  constructor(private vacationrequestservice:VacationrequestService,
              private router:Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadAllVacationrequests();
  }

  ngAfterViewInit(): void {
    this.loadAllVacationrequests();
  }


  loadAllVacationrequests() {
    this.vacationrequestservice.getAllVacationRequest().subscribe(vacationrequest =>{
      this.allVacationrequestviews = vacationrequest;
    });

  }

  deleteVacationrequest(vacationrequestId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
    this.vacationrequestservice.deleteVacationRequestById(vacationrequestId).subscribe(data => {
      this.loadAllVacationrequests();
    }, error => {
      console.log("error on delete: " + error.status);
      this.errorstatus = error.status;
      this.notificationService.showError(this.message, this.title);
  });
  }
  this.loadAllVacationrequests();
 }

 sendVacationrequestToEdit(vacationID: number){
  this.router.navigate([`vacationrequestAdd/${vacationID}`]);
 }

  compare(str1 : string, str2 : string){
    return str1.localeCompare(str2) == 0;
 }

}
