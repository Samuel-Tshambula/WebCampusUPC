import { PromotionService } from './../../../core/services/promotion.service';
import { CookieService } from './../../../core/services/cookie.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from './../../../core/services/auth.service';
import { DeliberationService } from './../../../core/services/deliberation.service';
import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-deliberation',
  imports: [CommonModule, NgIf, NgFor, FormsModule, NgClass ],
  templateUrl: './deliberation.component.html',
  styleUrl: './deliberation.component.css'
})
export class DeliberationComponent {
  private authService: AuthService = inject(AuthService);
  private deliberationService: DeliberationService = inject(DeliberationService);

  etudiant: any = null;
  promotion: any = null;
  deliberations: any[] = [];
  totalCredits: number = 0;
  moyenne: number | null = null;

  async ngOnInit() {
    try {
      this.etudiant = await this.authService.getEtudiantConnecte();
      this.promotion = this.etudiant.promotion;

      const resultats = await this.deliberationService.getDeliberationsByEtudiant();

      this.deliberations = resultats
        .filter((d:any) => d.course && d.grade !== undefined)
        .map((d:any) => ({
          title: d.course.title,
          grade: d.grade,
          credit: d.course.credits
        }));

      const allGradesPresent = this.deliberations.every(d => d.grade !== null && d.grade !== undefined);
      const validNotes = this.deliberations.filter(d => typeof d.grade === 'number');

      if (allGradesPresent && validNotes.length > 0) {
        const totalPoints = validNotes.reduce((sum, d) => sum + d.grade * d.credit, 0);
        const totalCredits = validNotes.reduce((sum, d) => sum + d.credit, 0);
        this.totalCredits = totalCredits;
        this.moyenne = +(totalPoints / totalCredits).toFixed(2);
      } else {
        this.moyenne = null;
        this.totalCredits = 0;
      }

    } catch (error) {
      console.error('Erreur chargement délibérations:', error);
    }
  }
}
