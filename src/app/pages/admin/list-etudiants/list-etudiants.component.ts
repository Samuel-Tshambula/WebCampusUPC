import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Student, StudentItem } from './../../../core/models/student';
import { StudentService } from './../../../core/services/student.service';
import { Component, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-etudiants',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './list-etudiants.component.html',
  styleUrl: './list-etudiants.component.css'
})
export class ListEtudiantsComponent {
  private studentService: StudentService = inject(StudentService);
  private searchSubject = new Subject<string>();
  students: Student[] = [];
  message: string | null = null;
  isError = false;
  searchTerm: string = '';
  allStudents: StudentItem[] = [];
  filteredStudents: StudentItem[] = [];

  async ngOnInit() {
  try {
    const response = await this.studentService.getAllStudents();
    this.allStudents = response;
    this.filteredStudents = response;
  } catch (err) {
    this.isError = true;
    this.message = 'Erreur lors du chargement des étudiants';
  }
}

constructor() {
  this.searchSubject
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe(term => {
      this.filteredStudents = this.allStudents.filter(student =>
        student.fullName.toLowerCase().includes(term) ||
        student.cardNumber.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term)
      );
    });
}

filterStudents() {
  const search = this.searchTerm.toLowerCase().trim();
  this.filteredStudents = this.allStudents.filter(student =>
    student.fullName.toLowerCase().includes(search) ||
    student.cardNumber.toLowerCase().includes(search) ||
    student.email.toLowerCase().includes(search)
  );
}


onSearchChange() {
  const search = this.searchTerm.toLowerCase().trim();
  this.searchSubject.next(search);
}


  closeAlert() {
    this.isError = false;
    this.message = null;
  }

  async deleteStudent(id: string) {
  if (!confirm("Confirmer la suppression de l'étudiant ?")) return;

  try {
    await this.studentService.deleteStudent(id);

    // Mise à jour des données sources
    this.allStudents = this.allStudents.filter(s => s._id !== id);

    // Réapplication du filtre (pour que filteredStudents soit à jour)
    this.filterStudents();

    this.message = 'Étudiant supprimé avec succès';
    this.isError = false;
  } catch (err: any) {
    this.message = err.message || 'Erreur lors de la suppression';
    this.isError = true;
  }
}


}
