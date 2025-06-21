import { CommonModule } from '@angular/common';
import { CoursService } from './../../../core/services/cours.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PromotionService } from './../../../core/services/promotion.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-cours-update',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cours-update.component.html',
  styleUrl: './cours-update.component.css'
})
export class CoursUpdateComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  courseService: CoursService = inject(CoursService);
  promotionService: PromotionService = inject(PromotionService)

  courseId = this.route.snapshot.params['id'];
  message: string | null = null;
  isError = false;
  isOpen = false;
  courseForm!: FormGroup;

  promotionList: any[] = [];

  async ngOnInit() {
    try {
      const course = await this.courseService.getCourseById(this.courseId);
      this.promotionList = await this.promotionService.getAllPromotions();

      this.courseForm = new FormGroup({
        title: new FormControl(course.title, Validators.required),
        description: new FormControl(course.description),
        credits: new FormControl(course.credits, Validators.required),
        promotion: new FormControl(course.promotion._id, Validators.required),
      });
    } catch (err: any) {
      this.isError = true;
      this.message = err.message;
    }
  }

  async submitCourse() {
    try {
      const value = this.courseForm.value;
      await this.courseService.updateCourse(this.courseId, value);
      this.isOpen = true;
      this.isError = false;
      this.message = 'Cours mis à jour avec succès';
    } catch (err: any) {
      this.isOpen = true;
      this.isError = true;
      this.message = err.message;
    }
  }

  close() {
    this.message = null;
    this.isOpen = false;
    this.isError = false;
  }
}
