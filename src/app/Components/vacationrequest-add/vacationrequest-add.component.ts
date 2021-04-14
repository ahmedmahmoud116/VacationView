import { Component, OnInit } from '@angular/core';
import { VacationrequestService } from '../../Services/vacationrequest.service';
import { Vacationrequest } from '../../Models/vacationrequest';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VacationService } from '../../Services/vacation.service';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-vacationrequest-add',
  templateUrl: './vacationrequest-add.component.html',
  styleUrls: ['./vacationrequest-add.component.css']
})
export class VacationrequestAddComponent implements OnInit {

  allVacationrequests:any =  [];
  vacationrequestForm: any;
  dataSaved = false;
  vacationrequestIdUpdate = null as any;
  vacationList: any;
  employeeList: any;

  constructor(private formbulider: FormBuilder,
              private vacationrequestservice: VacationrequestService,
              private route: ActivatedRoute,
              private router: Router,
              private vacationService: VacationService,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.vacationrequestForm = this.formbulider.group({
      employeeid: ['', [Validators.required]],
      vacationid: ['', [Validators.required]],
      days: ['', [Validators.required]]
    });
    // this.employeebalanceIdUpdate= this.route.snapshot.params['id'];
    // if(this.employeebalanceIdUpdate != null)
    //   this.loadEmployeeBalanceToEdit(this.employeebalanceIdUpdate);
    this.vacationService.getAllVacation().subscribe(vacation =>{
      this.vacationList = vacation;
    });;
    this.employeeService.getAllEmployee().subscribe(employee =>{
      this.employeeList = employee;
    });;

    this.vacationrequestIdUpdate= this.route.snapshot.params['id'];
    if(this.vacationrequestIdUpdate != null)
      this.loadvacationrequestToEdit(this.vacationrequestIdUpdate);
  }

  onFormSubmit() {
    this.dataSaved = false;
    const vacationrequest = this.vacationrequestForm.value;
    this.CreateVacationRequest(vacationrequest);
    // this.employeeForm.reset();
  }

  CreateVacationRequest(vacationrequest: Vacationrequest) {
    if (this.vacationrequestIdUpdate == null) {
      this.vacationrequestservice.createVacationRequest(vacationrequest).subscribe(
        () => {
          this.dataSaved = true;
          // this.message = 'Record saved Successfully';
          this.vacationrequestIdUpdate = null;
          // this.employeeForm.reset();
          this.returnToVacationRequest();
        }
      );
    } else {
      vacationrequest.id = this.vacationrequestIdUpdate;
      this.vacationrequestservice.updateVacationRequest(vacationrequest.id, vacationrequest).subscribe(() => {
        this.dataSaved = true;
        // this.message = 'Record Updated Successfully';
        this.vacationrequestIdUpdate = null;
        // this.employeeForm.reset();
        this.returnToVacationRequest();
      });
    }
  }

  loadvacationrequestToEdit(vacationrequestId: number) {
    this.vacationrequestservice.getVacationRequestById(vacationrequestId).subscribe(vacationrequest=> {
      console.log(vacationrequest);
      // this.message = null;
      this.dataSaved = false;
      this.vacationrequestIdUpdate = vacationrequest.id;
      this.vacationrequestForm.controls['employeeid'].setValue(vacationrequest.employeeID);
      this.vacationrequestForm.controls['vacationid'].setValue(vacationrequest.vacationID);
      this.vacationrequestForm.controls['days'].setValue(vacationrequest.days);
    });
  }

  resetForm() {
    this.vacationrequestForm.reset();
    // this.message = null;
    this.dataSaved = false;
  }

  returnToVacationRequest() {
    this.router.navigate([`vacationrequest`]);
  }

  convertValue(type: string){
    return type;
  }
}
