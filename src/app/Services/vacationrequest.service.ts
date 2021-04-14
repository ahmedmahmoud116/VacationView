import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacationrequest } from '../Models/vacationrequest';
import { VacationrequestView } from '../Models/vacationrequest-view';

@Injectable({
  providedIn: 'root'
})
export class VacationrequestService {
  url = 'https://localhost:5001/api/EmployeeRequest';
  constructor(private http: HttpClient) { }

  getAllVacationRequest(): Observable<VacationrequestView[]> {
    return this.http.get<VacationrequestView[]>(this.url);
  }
  getVacationRequestById(vacationrequestId: number): Observable<Vacationrequest> {
    return this.http.get<Vacationrequest>(this.url + '/' + vacationrequestId);
  }
  createVacationRequest(vacationrequest: Vacationrequest): Observable<Vacationrequest> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<Vacationrequest>(this.url, vacationrequest, httpOptions);
  }
  updateVacationRequest(vacationrequestId: number, vacationrequest: Vacationrequest): Observable<Vacationrequest> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<Vacationrequest>(this.url + '/' + vacationrequestId, vacationrequest, httpOptions);
  }
  deleteVacationRequestById(vacationrequestId: number): Observable<Vacationrequest> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<Vacationrequest>(this.url + '/' +vacationrequestId, httpOptions);
  }
}
