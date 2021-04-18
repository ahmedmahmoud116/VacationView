import { Component, OnInit } from '@angular/core';
import { VacationrequestService } from '../../Services/vacationrequest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vacationrequest',
  templateUrl: './vacationrequest.component.html',
  styleUrls: ['./vacationrequest.component.css']
})
export class VacationrequestComponent implements OnInit {
  allVacationrequestviews:any =  [];
  constructor(private vacationrequestservice:VacationrequestService, private router:Router) { }

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
    this.vacationrequestservice.deleteVacationRequestById(vacationrequestId).subscribe(() => {
      this.loadAllVacationrequests();
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
