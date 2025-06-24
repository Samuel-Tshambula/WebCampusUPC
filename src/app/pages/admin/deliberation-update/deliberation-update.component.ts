import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CoursService } from './../../../core/services/cours.service';
import { PromotionService } from './../../../core/services/promotion.service';
import { StudentService } from './../../../core/services/student.service';
import { DeliberationService } from './../../../core/services/deliberation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-deliberation-update',
  imports: [ReactiveFormsModule, NgSelectModule, CommonModule],
  templateUrl: './deliberation-update.component.html',
  styleUrl: './deliberation-update.component.css'
})
export class DeliberationUpdateComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private deliberationService: DeliberationService = inject(DeliberationService);
  private studentService: StudentService = inject(StudentService);
  private promotionService: PromotionService = inject(PromotionService);
  private coursService: CoursService = inject(CoursService);

  deliberationForm = new FormGroup({
    student: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    grade: new FormControl('', [Validators.required, Validators.min(0), Validators.max(20)]),
  });

  message: string | null = null;
  isError = false;

  promotions: any[] = [];
  students: any[] = [];
  filteredStudents: any[] = [];
  courses: any[] = [];
  filteredCourses: any[] = [];

  deliberationId = '';

  async ngOnInit() {
    try {
      this.deliberationId = this.route.snapshot.paramMap.get('promotionId') || '';
      const deliberation = await this.deliberationService.getDeliberationById(this.deliberationId);

      // Load all promotions, students and courses
      this.promotions = await this.promotionService.getAllPromotions();
      this.students = await this.studentService.getAllStudents();
      this.courses = await this.coursService.getAllCourses();

      const promotionId = deliberation.student.promotion._id;
      this.filteredStudents = this.students.filter(s => s.promotion?._id === promotionId);
      this.filteredCourses = this.courses.filter(c => c.promotion?._id === promotionId);

      this.deliberationForm.patchValue({
        student: deliberation.student._id,
        course: deliberation.course._id,
        grade: deliberation.grade,
      });

    } catch (err: any) {
      this.message = err.message || 'Erreur de chargement';
      this.isError = true;
    }
  }

  async updateDeliberation() {
    if (this.deliberationForm.invalid) return;

    try {
      const studentId = this.deliberationForm.value.student ?? '';
      const courseId = this.deliberationForm.value.course ?? '';
      const grade = Number(this.deliberationForm.value.grade ?? 0);

      await this.deliberationService.updateDeliberation(this.deliberationId, {
        student: studentId,
        course: courseId,
        grade
      });
      this.message = '✅ Délibération modifiée avec succès';
      this.isError = false;
      setTimeout(() => this.router.navigate(['/admin/deliberation']), 1500);
    } catch (err: any) {
      this.message = err.message || 'Erreur lors de la modification';
      this.isError = true;
    }
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
