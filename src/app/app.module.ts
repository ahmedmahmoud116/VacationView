import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { EmployeeService } from './employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Routes, RouterModule } from '@angular/router'
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { VacationComponent } from './vacation/vacation.component';
import { VacationAddComponent } from './vacation-add/vacation-add.component';
import { EmployeebalanceComponent } from './employeebalance/employeebalance.component';
import { EmployeebalanceAddComponent } from './employeebalance-add/employeebalance-add.component';

const appRoutes: Routes =[
  { path:'employee', component: EmployeeComponent},
  { path:'employeeAdd', component: EmployeeAddComponent},
  { path:'employeeAdd/:id', component: EmployeeAddComponent},
  { path:'vacation', component: VacationComponent},
  { path:'vacationAdd', component: VacationAddComponent},
  { path:'vacationAdd/:id', component: VacationAddComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeAddComponent,
    VacationComponent,
    VacationAddComponent,
    EmployeebalanceComponent,
    EmployeebalanceAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatRadioModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),

    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatNativeDateModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule
  ],
  providers: [HttpClientModule, EmployeeService,MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
