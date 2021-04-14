import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacation } from '../Models/vacation';

@Injectable({ providedIn: 'root'})
export class VacationService {
  url = 'https://localhost:5001/api/Vacation';
  allVacations : Observable<Vacation[]>;
  constructor(private http: HttpClient) { }

  getAllVacation(): Observable<Vacation[]> {
    return this.http.get<Vacation[]>(this.url);
  }
  getVacationById(vacationId: number): Observable<Vacation> {
    return this.http.get<Vacation>(this.url + '/' + vacationId);
  }
  createVacation(vacation: Vacation): Observable<Vacation> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<Vacation>(this.url, vacation, httpOptions);
  }
  updateVacation(vacationId: number, vacation: Vacation): Observable<Vacation> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<Vacation>(this.url + '/' + vacationId, vacation, httpOptions);
  }
  deleteVacationById(vacationId: number): Observable<Vacation> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<Vacation>(this.url + '/' +vacationId, httpOptions);
  }
}
