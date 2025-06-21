import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TeacherItem } from './../../../core/models/teacher';
import { AuthAdminService } from './../../../core/services/auth-admin.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-enseignant-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './enseignant-view.component.html',
  styleUrl: './enseignant-view.component.css'
})
export class EnseignantViewComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private teacherService: AuthAdminService = inject(AuthAdminService);

  teacher!: TeacherItem;
  message: string | null = null;
  isError = false;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    try {
      this.teacher = await this.teacherService.getTeacherById(id);
    } catch (err: any) {
      this.message = err.message || "Erreur lors du chargement du professeur";
      this.isError = true;
    }
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
