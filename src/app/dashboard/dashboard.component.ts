import { Component, OnInit } from '@angular/core';
import { DataComponent } from './data/data.component';
import { AddDataComponent } from './add-data/add-data.component';
import { ButtonComponent } from './button/button.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationListComponent } from '../registration-list/registration-list.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DataComponent, AddDataComponent, ButtonComponent, CommonModule, ReactiveFormsModule, RegistrationListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public showRegistrations = false;
  public showForm = false;

  buttonClicked() {
    this.showForm = !this.showForm;
  }
  toggleRegistrations() {
    this.showRegistrations = !this.showRegistrations;
  }
}
