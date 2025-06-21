import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeacherItem } from './../../../core/models/teacher';
import { AuthAdminService } from './../../../core/services/auth-admin.service';
import { Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-enseignant',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-enseignant.component.html',
  styleUrl: './list-enseignant.component.css'
})
export class ListEnseignantComponent {
  private teacherService: AuthAdminService = inject(AuthAdminService);
  teachers: TeacherItem[] = [];
  filteredTeachers: TeacherItem[] = [];
  allTeachers: TeacherItem[] = [];
  searchTerm: string = '';
  private searchSubject = new Subject<string>();
  message: string | null = null;
  isError = false;

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(term => {
        const search = term.toLowerCase().trim();
        this.filteredTeachers = this.allTeachers.filter(t =>
          t.fullName.toLowerCase().includes(search)
        );
      });
  }

  async ngOnInit() {
    try {
      const res = await this.teacherService.getAllTeachers();
      this.allTeachers = res;
      this.filteredTeachers = res;
    } catch (err) {
      this.message = 'Erreur lors du chargement des professeurs';
      this.isError = true;
    }
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm);
  }

  async deleteTeacher(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer ce professeur ?")) return;

    try {
      await this.teacherService.deleteTeacher(id);
      this.allTeachers = this.allTeachers.filter(t => t._id !== id);
      this.filteredTeachers = this.filteredTeachers.filter(t => t._id !== id);
      this.message = 'Professeur supprimé avec succès';
      this.isError = false;
    } catch (err: any) {
      this.message = err.message || 'Erreur lors de la suppression';
      this.isError = true;
    }
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
