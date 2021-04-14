import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employeebalance } from '../Models/employeebalance';
import { Vacationview } from '../Models/vacationview';
@Injectable({
  providedIn: 'root'
})
export class EmployeebalanceService {
  url = 'https://localhost:5001/api/EmployeeBalance';
  constructor(private http: HttpClient) { }

  getAllEmployeeBalance(): Observable<Vacationview[]> {
    return this.http.get<Vacationview[]>(this.url);
  }
  getEmployeeBalanceById(employeebalanceId: number): Observable<Employeebalance> {
    return this.http.get<Employeebalance>(this.url + '/' + employeebalanceId);
  }
  createEmployeeBalance(employeebalance: Employeebalance): Observable<Employeebalance> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<Employeebalance>(this.url, employeebalance, httpOptions);
  }
  updateEmployeeBalance(employeebalanceId: number, employeebalance: Employeebalance): Observable<Employeebalance> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<Employeebalance>(this.url + '/' + employeebalanceId, employeebalance, httpOptions);
  }
  deleteEmployeeBalanceById(employeebalanceId: number): Observable<Employeebalance> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<Employeebalance>(this.url + '/' +employeebalanceId, httpOptions);
  }
  updateEmployeeBalances(vacationviews: Vacationview[]): Observable<Vacationview[]> { //to update bulk of employeebalances
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<Vacationview[]>(this.url, vacationviews, httpOptions);
  }
}
