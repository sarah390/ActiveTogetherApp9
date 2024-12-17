import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  public registrationForm: any;
  public isRegistered = false;
  public formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public storeService: StoreService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      birthdate: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      newsletter: [false],
      courseId: ['', [Validators.required]]
    });
  }

    onSubmit(): void {
      this.formSubmitted = true;
      console.log(this.registrationForm.get('email')?.valid);  // Prüfen, ob das E-Mail-Feld gültig ist
      if (this.registrationForm.valid) {
        this.backendService.addRegistration(this.registrationForm.value, this.storeService.currentPage);
        this.isRegistered = true;
        setTimeout(() => (this.isRegistered = false), 8000);  // Erfolgsmeldung
        this.registrationForm.reset();
        this.formSubmitted = false;
      } else {
        console.log('Formular ist ungültig:', this.registrationForm);  // Gibt das gesamte Formular aus
      }
    }
}
