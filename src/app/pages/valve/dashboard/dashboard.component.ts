import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  nom = 'Jean Kabila';
  matricule = 'UPC2021-00123';
  promotion = 'L2 Info';

  tpsActifs = 2;
  delibsDisponibles = true;
  reclamations = 1;

  coursEtudiant: any[] = [];
  prochainCours: any = {
    cours: 'Aucun cours prévu',
    date: '-',
    heure: '-',
    local: '-'
  };

  ngOnInit(): void {
    this.coursEtudiant = [
      { titre: 'Programmation Web', jour: 'Mardi', heureDebut: '08:00', heureFin: '10:00', salle: 'B101', professeur: 'M. Bemba' },
      { titre: 'Systèmes Réseaux', jour: 'Mercredi', heureDebut: '14:00', heureFin: '16:00', salle: 'C202', professeur: 'Mme Kazi' },
      { titre: 'Base de Données', jour: 'Vendredi', heureDebut: '11:00', heureFin: '13:00', salle: 'D305', professeur: 'M. Tunda' },
    ];

    this.calculerProchainCours();
  }

  calculerProchainCours() {
    const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const maintenant = dayjs();
    const jourActuelIndex = maintenant.day();
    const heureActuelle = maintenant.format('HH:mm');

    for (let i = 0; i < 7; i++) {
      const jourCibleIndex = (jourActuelIndex + i) % 7;
      const jourNom = jours[jourCibleIndex];

      let coursJour = this.coursEtudiant.filter(c => c.jour === jourNom);
      if (i === 0) {
        coursJour = coursJour.filter(c => c.heureDebut > heureActuelle);
      }

      if (coursJour.length > 0) {
        const prochain = coursJour.sort((a, b) => a.heureDebut.localeCompare(b.heureDebut))[0];
        this.prochainCours = {
          cours: prochain.titre,
          date: `${prochain.jour} ${dayjs().add(i, 'day').format('DD/MM/YYYY')}`,
          heure: `${prochain.heureDebut} - ${prochain.heureFin}`,
          local: prochain.salle
        };
        break;
      }
    }
  }
}
