import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HoraireService {

  constructor() { }

    horaires = [
    {
      promotion: 'L2 Informatique',
      jour: 'Lundi',
      heure: '08h00 - 10h00',
      cours: 'Programmation Web',
      prof: 'M. Kabila',
      salle: 'B201',
    },
    {
      promotion: 'L2 Informatique',
      jour: 'Mercredi',
      heure: '10h00 - 12h00',
      cours: 'Réseaux',
      prof: 'Mme. Tshisekedi',
      salle: 'B103',
    },
    {
      promotion: 'L1 Droit',
      jour: 'Mardi',
      heure: '08h00 - 10h00',
      cours: 'Introduction au Droit',
      prof: 'M. Lumumba',
      salle: 'A102',
    },
  ];

  getHorairesParPromotion(promotion: string) {
    return this.horaires.filter(h => h.promotion === promotion);
  }
}
