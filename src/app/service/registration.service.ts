import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://localhost:5000/registrations';

  constructor(private http: HttpClient) {}

  // Alle Registrierungen abrufen
  getRegistrations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Registrierung löschen
  deleteRegistration(registrationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${registrationId}`);
  }

  // Neue Registrierung hinzufügen
  addRegistration(registration: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, registration);
  }
}
