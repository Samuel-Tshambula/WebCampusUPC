import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CoursService } from './../../../core/services/cours.service';
import { CourseItem } from './../../../core/models/cours';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-list-cours',
  imports: [RouterLink, CommonModule],
  templateUrl: './list-cours.component.html',
  styleUrl: './list-cours.component.css'
})
export class ListCoursComponent {
  courseService: CoursService = inject(CoursService);

  courses: CourseItem[] = [];
  message: string | null = null;
  isError = false;

  async ngOnInit() {
    try {
      this.courses = await this.courseService.getAllCourses();
    } catch (err: any) {
      this.message = err.message || 'Erreur de chargement des cours';
      this.isError = true;
    }
  }

  async deleteCourse(id: string) {
    if (!confirm('Confirmer la suppression de ce cours ?')) return;

    try {
      const res = await this.courseService.deleteCourse(id);
      this.courses = this.courses.filter(c => c._id !== id);
      this.message = res.message;
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
