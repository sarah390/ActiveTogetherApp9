import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../service/registration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css'],
})
export class RegistrationListComponent implements OnInit {
  registrations: any[] = [];
  filteredRegistrations: any[] = [];
  isLoadingRow: { [key: number]: boolean } = {};
  successMessage: string = '';
  currentPage: number = 1;
  registrationsPerPage: number = 5;
  totalPages: number = 0;

  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.loadRegistrations();
  }

  loadRegistrations(): void {
    this.registrationService.getRegistrations().subscribe({
      next: (data) => {
        this.registrations = data;
        this.filteredRegistrations = data; // Initialisieren
        this.updatePagination();
      },
      error: (err) => console.error('Fehler beim Laden der Registrierungen:', err),
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.registrations.length / this.registrationsPerPage);
    const startIndex = (this.currentPage - 1) * this.registrationsPerPage;
    const endIndex = startIndex + this.registrationsPerPage;
    this.filteredRegistrations = this.registrations.slice(startIndex, endIndex);
  }
  

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  

  filterRegistrations(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredRegistrations = this.registrations.filter((registration) =>
      registration.name.toLowerCase().includes(searchTerm) ||
      registration.courseId.toLowerCase().includes(searchTerm)
    );
  
    // Zurück zur ersten Seite setzen
    this.currentPage = 1;
    this.updatePagination();
  }

  sortByCreatedAt(order: 'asc' | 'desc'): void {
    this.registrations.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  
    // Sortierte Daten auf die aktuelle Seite anwenden
    this.updatePagination();
  }

  confirmDelete(registrationId: number): void {
    if (confirm('Möchten Sie diese Anmeldung wirklich löschen?')) {
      this.deleteRegistration(registrationId);
    }
  }

  deleteRegistration(registrationId: number): void {
    this.isLoadingRow[registrationId] = true; // Ladezustand aktivieren
  
    this.registrationService.deleteRegistration(registrationId).subscribe({
      next: () => {
        this.registrations = this.registrations.filter((reg) => reg.id !== registrationId); // Registrierung entfernen
        this.updatePagination(); // Pagination aktualisieren
        delete this.isLoadingRow[registrationId]; // Ladezustand deaktivieren
      },
      error: (err) => {
        console.error('Fehler beim Löschen der Registrierung:', err);
        this.isLoadingRow[registrationId] = false; // Ladezustand deaktivieren
      },
    });
  }
  triggerSearch(value: string): void {
    this.filteredRegistrations = this.registrations.filter((registration) =>
      registration.name.toLowerCase().includes(value.toLowerCase()) ||
      registration.courseId.toLowerCase().includes(value.toLowerCase())
    );
    this.currentPage = 1; // Setzt die Seite auf die erste zurück
    this.updatePagination();
  }
  highlightRow(name: string): void {
    if (!name.trim()) {
      alert('Bitte geben Sie einen Namen ein.');
      return;
    }
  
    // Entfernt die vorherige Hervorhebung
    const rows = document.querySelectorAll('.table tbody tr');
    rows.forEach((row) => row.classList.remove('highlight'));
  
    // Findet die Zeilen mit dem eingegebenen Namen und hebt diese hervor
    const matchingRows = Array.from(rows).filter((row) =>
      row.textContent?.toLowerCase().includes(name.toLowerCase())
    );
  
    if (matchingRows.length > 0) {
      matchingRows.forEach((row) => row.classList.add('highlight'));
    } else {
      alert('Kein Teilnehmer/in gefunden.');
    }
  }
  
}
