import { PromotionItem } from './../../../core/models/promotion';
import { PromotionService } from './../../../core/services/promotion.service';
import { StudentService } from './../../../core/services/student.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-etudiants-update',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './etudiants-update.component.html',
  styleUrl: './etudiants-update.component.css'
})
export class EtudiantsUpdateComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private studentService: StudentService = inject(StudentService);
  private promoService: PromotionService = inject(PromotionService);
  private router: Router = inject(Router);

  studentForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    cardNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    promotion: new FormControl('', Validators.required),
  });

  message: string | null = null;
  isError = false;
  promotions: PromotionItem[] = [];

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    try {
      this.promotions = await this.promoService.getAllPromotions();
      const student = await this.studentService.getStudentById(id);

      this.studentForm.patchValue({
        fullName: student.fullName,
        cardNumber: student.cardNumber,
        email: student.email,
        promotion: student.promotion._id,
      });
    } catch (err: any) {
      this.isError = true;
      this.message = err.message || 'Erreur de chargement';
    }
  }

  async submitStudent() {
    const id = this.route.snapshot.paramMap.get('id')!;
    try {
      const payload = this.studentForm.getRawValue();
      await this.studentService.updateStudent(id, payload as any);
      this.message = 'Mise à jour effectuée';
      this.isError = false;
    } catch (err: any) {
      this.message = err.message || 'Erreur mise à jour';
      this.isError = true;
    }
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
