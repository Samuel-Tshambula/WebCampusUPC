import { StudentItem } from './../../../core/models/student';
import { PromotionItem } from './../../../core/models/promotion';
import { PromotionService } from './../../../core/services/promotion.service';
import { AuthService } from './../../../core/services/auth.service';
import { HoraireService } from './../../../core/services/horaire.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horaires',
  imports: [CommonModule],
  templateUrl: './horaires.component.html',
  styleUrl: './horaires.component.css'
})
export class HorairesComponent {
  scheduleService: HoraireService = inject(HoraireService);
  authService: AuthService = inject(AuthService);
  etudiant : StudentItem | null = null;

  horaires: any[] = [];
  promotion: string = '';

  async ngOnInit() {
    const ordreJours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  try {
    this.etudiant = await this.authService.getEtudiantConnecte();

    if (!this.etudiant) {
      throw new Error('Étudiant non trouvé. Veuillez vous connecter.');
    }

    this.promotion = this.etudiant.promotion.nom + ' - ' + this.etudiant.promotion.section.name;

    const horairesNonGroupes = await this.scheduleService.getHoraireParEtudiant();

    // 🧠 Grouper les horaires par jour
    const groupes = horairesNonGroupes.reduce((acc: any, horaire: any) => {
      const jour = horaire.jour;
      if (!acc[jour]) acc[jour] = [];
      acc[jour].push(horaire);
      return acc;
    }, {});

    // 🔁 Convertir en tableau
    this.horaires = ordreJours
      .filter(jour => groupes[jour]) // éviter les jours vides
      .map(jour => ({
        jour,
        cours: groupes[jour]
    }));
  } catch (error: any) {
    console.error('Erreur lors du chargement des horaires :', error.message);
  }
}

}
