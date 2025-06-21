import { RouterLink } from '@angular/router';
import { CoursService } from './../../../core/services/cours.service';
import { AuthAdminService } from './../../../core/services/auth-admin.service';
import { Course, CourseItem } from './../../../core/models/cours';
import { NgFor, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-enseignants-add',
  imports: [ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './enseignants-add.component.html',
  styleUrl: './enseignants-add.component.css'
})
export class EnseignantsAddComponent {

  private teacherService: AuthAdminService = inject(AuthAdminService);
  private courseService: CoursService = inject(CoursService);

  teacherForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    password: new FormControl('', Validators.required),
    courses: new FormControl([], Validators.required),
  });

  courses: CourseItem[] = [];
  message: string | null = null;
  isError = false;

  async ngOnInit() {
    try {
      this.courses = await this.courseService.getAllCourses(); // Avec populate(promotion)
    } catch {
      this.message = 'Erreur lors du chargement des cours';
      this.isError = true;
    }
  }

  async submitTeacher() {
    try {
      const payload = this.teacherForm.getRawValue();
      await this.teacherService.registerTeacher(payload as any);
      this.message = 'Professeur inscrit avec succès';
      this.isError = false;
      this.teacherForm.reset();
    } catch (err: any) {
      this.message = err.message;
      this.isError = true;
    }
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
