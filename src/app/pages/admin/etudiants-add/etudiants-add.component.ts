import { CommonModule } from '@angular/common';
import { PromotionItem } from './../../../core/models/promotion';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from './../../../core/services/student.service';
import { PromotionService } from './../../../core/services/promotion.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-etudiants-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './etudiants-add.component.html',
  styleUrl: './etudiants-add.component.css'
})
export class EtudiantsAddComponent {
  private promoService: PromotionService = inject(PromotionService);
  private studentService: StudentService = inject(StudentService);

  studentForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    cardNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    promotion: new FormControl('', Validators.required),
  });

  message: string | null = null;
  isError = false;
  promotions: PromotionItem[] = [];

  async ngOnInit() {
    try {
      this.promotions = await this.promoService.getAllPromotions();
    } catch (err) {
      this.isError = true;
      this.message = 'Erreur de chargement des promotions';
    }
  }

 async submitStudent() {
  if (this.studentForm.invalid) {
    this.isError = true;
    this.message = 'Veuillez remplir correctement tous les champs.';
    return;
  }

  try {
    const payload = {
      fullName: this.studentForm.get('fullName')!.value!,
      cardNumber: this.studentForm.get('cardNumber')!.value!,
      email: this.studentForm.get('email')!.value!,
      password: this.studentForm.get('password')!.value!,
      promotion: this.studentForm.get('promotion')!.value!
    };

    const res = await this.studentService.registerStudent(payload);
    this.message = res.message;
    this.isError = false;
    this.studentForm.reset();
  } catch (err: any) {
    this.isError = true;
    this.message = err.message || 'Erreur lors de l’inscription';
  }
}

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
