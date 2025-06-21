import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { PromotionItem } from './../../../core/models/promotion';
import { PromotionService } from './../../../core/services/promotion.service';
import { CoursService } from './../../../core/services/cours.service';
import { CourseResponse } from './../../../core/models/cours';
import { CookieService } from './../../../core/services/cookie.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-cours-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cours-add.component.html',
  styleUrl: './cours-add.component.css'
})
export class CoursAddComponent {

  courseService: CoursService = inject(CoursService);
  promotionService: PromotionService = inject(PromotionService);

  isOpen = false;
  isError = false;
  message: string | null = null;

  promotions: PromotionItem[] = [];

  courseForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    credits: new FormControl(1, [Validators.required, Validators.min(1)]),
    promotion: new FormControl('', Validators.required)
  });

  async ngOnInit() {
    try {
      this.promotions = await this.promotionService.getAllPromotions();
    } catch (err: any) {
      this.isError = true;
      this.message = err.message || 'Erreur lors du chargement des promotions';
    }
  }

  async submitCourse() {
    if (this.courseForm.invalid) return;

    try {
      const course = this.courseForm.value;
      const res = await this.courseService.addCourse(course as any);
      this.message = res.message;
      this.isOpen = true;
      this.isError = false;
      this.courseForm.reset();
    } catch (err: any) {
      this.isError = true;
      this.message = err.message || 'Erreur lors de l’enregistrement';
    }
  }

  close() {
    this.isOpen = false;
    this.isError = false;
    this.message = null;
  }
}
