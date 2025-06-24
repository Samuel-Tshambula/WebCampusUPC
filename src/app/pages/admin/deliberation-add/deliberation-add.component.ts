import { NgSelectModule } from '@ng-select/ng-select';
import { PromotionService } from './../../../core/services/promotion.service';
import { CommonModule } from '@angular/common';
import { StudentService } from './../../../core/services/student.service';
import { CoursService } from './../../../core/services/cours.service';
import { DeliberationService } from './../../../core/services/deliberation.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-deliberation-add',
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './deliberation-add.component.html',
  styleUrl: './deliberation-add.component.css'
})
export class DeliberationAddComponent {
  deliberationForm = new FormGroup({
    student: new FormControl({ value: null, disabled: true }, Validators.required),
    course: new FormControl('', Validators.required),
    grade: new FormControl('', [Validators.required, Validators.min(0), Validators.max(20)]),
  });

  private deliberationService: DeliberationService = inject(DeliberationService);
  private courseService: CoursService = inject(CoursService);
  private promotionService: PromotionService = inject(PromotionService);
  private studentService: StudentService = inject(StudentService);

  students: any[] = [];
  filteredStudents: any[] = [];
  filteredCourses: any[] = [];
  courses: any[] = [];
  promotions: any[] = [];

  message: string | null = null;
  isError = false;

 async ngOnInit() {
    try {
      this.students = await this.studentService.getAllStudents(); // Tous les étudiants
      this.promotions = await this.promotionService.getAllPromotions();
      this.courses = await this.courseService.getAllCourses();
    } catch (err: any) {
      this.message = err.message || 'Erreur lors du chargement';
      this.isError = true;
    }
  }

  onPromotionChange(promotionId: string) {
  // Filtrer les étudiants
  this.filteredStudents = this.students.filter(s => s.promotion?._id === promotionId);

  // Filtrer les cours
  this.filteredCourses = this.courses.filter(c => c.promotion?._id === promotionId);

  // Réinitialise les champs si la promotion change
  this.deliberationForm.patchValue({
    student: null,
    course: ''
  });
}

  

  async submitDeliberation() {
    if (this.deliberationForm.invalid) return;
    const { student, course, grade } = this.deliberationForm.value;

    try {
      await this.deliberationService.ajouterDeliberation({
        student: student ?? '',
        course: course ?? '',
        grade: Number(grade),
      });
      this.message = '✅ Délibération ajoutée avec succès';
      this.isError = false;
      this.deliberationForm.reset();
      this.filteredStudents = [];
    } catch (err: any) {
      this.message = err.message || 'Erreur lors de la soumission';
      this.isError = true;
    }
  }

  handlePromotionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedPromotionId = selectElement.value;
    this.onPromotionChange(selectedPromotionId); // ta méthode existante
    if (this.filteredStudents.length > 0) {
    this.deliberationForm.get('student')?.enable();
  } else {
    this.deliberationForm.get('student')?.disable();
  }
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
