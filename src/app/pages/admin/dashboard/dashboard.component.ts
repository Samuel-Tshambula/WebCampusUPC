import { CommonModule } from '@angular/common';
import { AuthAdminService } from './../../../core/services/auth-admin.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats: any = null;
  errorMessage = '';
  authService : AuthAdminService = inject(AuthAdminService)

  async ngOnInit(): Promise<void> {
    try {
      this.stats = await this.authService.getStatistics();
    } catch (err) {
      this.errorMessage = 'Erreur lors du chargement des statistiques.';
    }
  }
}
