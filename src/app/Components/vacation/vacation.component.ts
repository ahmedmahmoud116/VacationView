import { Component, OnInit } from '@angular/core';
import { VacationService } from '../../Services/vacation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
  allVacations:any =  [];
  constructor(private vacationservice:VacationService, private router:Router) { }

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
    this.vacationservice.deleteVacationById(vacationId).subscribe(() => {
      this.loadAllVacations();
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
