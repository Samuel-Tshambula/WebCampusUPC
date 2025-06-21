import { CommonModule } from '@angular/common';
import { CoursService } from './../../../core/services/cours.service';
import { CourseItem } from './../../../core/models/cours';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-cours-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './cours-view.component.html',
  styleUrl: './cours-view.component.css'
})
export class CoursViewComponent {
  courseService: CoursService = inject(CoursService);
  route: ActivatedRoute = inject(ActivatedRoute);

  courseId = this.route.snapshot.params['id'];
  course!: CourseItem;
  isError = false;
  message: string | null = null;

  async ngOnInit() {
    try {
      this.course = await this.courseService.getCourseById(this.courseId);
    } catch (err: any) {
      this.isError = true;
      this.message = err.message || 'Erreur lors du chargement';
    }
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
