import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 enseignant = {
    nom: 'Prof. Mavungu',
    email: 'mavungu@upc.cd',
    cours: [
      {
        nom: 'Réseaux Informatiques',
        promotions: ['L2 Informatique', 'L3 Informatique']
      },
      {
        nom: 'Programmation Web',
        promotions: ['L2 Informatique']
      },
      {
        nom: 'Administration Systèmes',
        promotions: ['L3 Informatique', 'M1 Réseaux']
      }
    ]
  };

  nombreReclamations = 5;

  reclamationsNonLues = [
    {
      objet: 'Note non conforme',
      etudiant: 'Jean Kongo',
      promotion: 'L2 Informatique'
    },
    {
      objet: 'Correction non reçue',
      etudiant: 'Merveille Tshimanga',
      promotion: 'L3 Informatique'
    }
  ];

  annonces = [
    {
      titre: 'Réunion pédagogique',
      date: '03 juin 2025',
      message: 'Une réunion est prévue ce vendredi à 10h pour discuter des examens.'
    },
    {
      titre: 'Nouvelle grille horaire',
      date: '01 juin 2025',
      message: 'La nouvelle grille horaire est disponible sur votre espace enseignant.'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Ici tu pourras plus tard charger les données dynamiquement depuis un service
  }
}
