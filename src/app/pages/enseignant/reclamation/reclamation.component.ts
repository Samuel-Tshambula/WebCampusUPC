import { AuthService } from './../../../core/services/auth.service';
import { NgFor, NgIf } from '@angular/common';
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
  imports: [NgFor, NgIf],
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.css'
})
export class ReclamationComponent {
  reclamations: Reclamation[] = [];
  reclamationsFiltrees: Reclamation[] = [];

  coursEnseignes: string[] = ['Mathématiques', 'Programmation Web']; // Exemple
  reclamationSelectionnee: Reclamation | null = null;

  constructor() {}

  ngOnInit(): void {
    // Simuler des réclamations
    this.reclamations = [
      {
        id: 1,
        type: 'Note',
        objet: 'Note incorrecte',
        message: 'Ma note de programmation est incorrecte.',
        etudiant: { nom: 'Marie Ntumba', promotion: 'L1 Informatique' },
        cours: 'Programmation Web',
        date: '2025-06-02'
      },
      {
        id: 2,
        type: 'Présence',
        objet: 'Absence non justifiée',
        message: 'Je suis présent ce jour-là.',
        etudiant: { nom: 'Jean Kongo', promotion: 'L2 Informatique' },
        cours: 'Mathématiques',
        date: '2025-06-01'
      },
      {
        id: 3,
        type: 'Note',
        objet: 'Erreur de calcul',
        message: 'La moyenne semble mal calculée.',
        etudiant: { nom: 'Claire Mbuyi', promotion: 'L1 Droit' },
        cours: 'Économie', // Pas enseigné par le prof
        date: '2025-06-01'
      }
    ];

    // Filtrer selon les cours enseignés
    this.reclamationsFiltrees = this.reclamations.filter(reclamation =>
      this.coursEnseignes.includes(reclamation.cours)
    );
  }

  ouvrirDetails(reclamation: Reclamation) {
    this.reclamationSelectionnee = reclamation;
  }

  fermerDetails() {
    this.reclamationSelectionnee = null;
  }
}
