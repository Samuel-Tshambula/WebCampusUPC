import { ReclamationService } from './../../../core/services/reclamation.service';
import { AuthService } from './../../../core/services/auth.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

// Modèles fictifs simulés
interface Reclamation {
  id: number;
  type: string;
  objet: string;
  message: string;
  etudiant: {
    nom: string;
    promotion: string;
  };
  cours: string;
  date: string;
}

@Component({
  selector: 'app-reclamation',
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.css'
})
export class ReclamationComponent {
  reclamationsFiltrees: any[] = [];
  reclamationSelectionnee: any = null;
  message: string = '';
  isError = false;

  private reclamationService: ReclamationService = inject(ReclamationService);

  async ngOnInit() {
    try {
      this.reclamationsFiltrees = await this.reclamationService.getReclamationsProfesseur();
    } catch (error: any) {
      this.isError = true;
      this.message = error.message || 'Erreur de chargement.';
    }
  }


  ouvrirDetails(reclamation: Reclamation) {
    this.reclamationSelectionnee = reclamation;
  }

  fermerDetails() {
    this.reclamationSelectionnee = null;
  }
}
