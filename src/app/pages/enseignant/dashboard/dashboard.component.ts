import { CookieService } from './../../../core/services/cookie.service';
import { AuthService } from './../../../core/services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  cookie: CookieService = inject(CookieService);
  teacherId = String(this.cookie.get('id')); // 👉 Remplace ceci dynamiquement selon l'utilisateur connecté
  profile: any = null;
  courses: any[] = [];
  totalReclamations: number = 0;
  teacherService: AuthService = inject(AuthService);

  async ngOnInit() {
    try {
      const data = await this.teacherService.getDashboard(this.teacherId);
      this.profile = data.profile;
      this.courses = data.courses;
      this.totalReclamations = data.reclamations.total;
    } catch (err) {
      console.error(err);
    }
  }
}
