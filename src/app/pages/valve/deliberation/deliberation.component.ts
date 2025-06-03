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
  authService: AuthService = inject(AuthService);
  deliberationService: DeliberationService = inject(DeliberationService);

  promotion: string = '';
  etudiant: any;
  resultatsPromotion: any[] = [];
  searchTerm: string = ''; // Mot-clé recherché
  resultatsFiltres: any[] = []; // Résultat après tri et filtre

  ngOnInit() {
    this.etudiant = this.authService.getEtudiantConnecte();
    this.promotion = this.etudiant.promotion;
    const resultats = this.deliberationService.getDeliberationParPromotion(this.promotion);

    // Tri alphabétique par nom
    this.resultatsPromotion = resultats.sort((a, b) =>
      a.nom.localeCompare(b.nom)
    );

    this.resultatsFiltres = [...this.resultatsPromotion]; // Initialisation
  }

  rechercherEtudiant() {
    const terme = this.searchTerm.trim().toLowerCase();
    this.resultatsFiltres = this.resultatsPromotion.filter(e =>
      e.nom.toLowerCase().includes(terme)
    );
  }
}
