import { CoursService } from './../../../core/services/cours.service';
import { CourseItem } from './../../../core/models/cours';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthAdminService } from './../../../core/services/auth-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-enseignants-update',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './enseignants-update.component.html',
  styleUrl: './enseignants-update.component.css'
})
export class EnseignantsUpdateComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private teacherService: AuthAdminService = inject(AuthAdminService);
  private coursService: CoursService = inject(CoursService)

  teacherForm = new FormGroup({
  fullName: new FormControl<string>('', Validators.required),
  email: new FormControl<string>('', [Validators.required, Validators.email]),
  phone: new FormControl<string>(''),
  courses: new FormControl<string[]>([], Validators.required) // 👈 Spécifie le type ici
});

  message: string | null = null;
  isError = false;
  courses: CourseItem[] = [];

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    try {
      const teacher = await this.teacherService.getTeacherById(id);
      this.courses = await this.coursService.getAllCourses();

      this.teacherForm.patchValue({
        fullName: teacher.fullName,
        email: teacher.email,
        phone: teacher.phone || '',
        courses: teacher.courses.map(c => c._id)
      });
    } catch (err: any) {
      this.message = err.message || 'Erreur de chargement';
      this.isError = true;
    }
  }

  async submitTeacher() {
    const id = this.route.snapshot.paramMap.get('id')!;
    try {
      await this.teacherService.updateTeacher(id, this.teacherForm.getRawValue() as any);
      this.message = 'Professeur mis à jour avec succès';
      this.isError = false;
    } catch (err: any) {
      this.message = err.message || 'Erreur de mise à jour';
      this.isError = true;
    }
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
