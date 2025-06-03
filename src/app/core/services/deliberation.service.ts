import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliberationService {

  constructor() { }

  private mockData = [
    {
      nom: 'Jean Kongo',
      matricule: 'ETU123',
      promotion: 'L2 Informatique',
      notes: [
        { cours: 'Mathématiques', note: 14, credit: 4 },
        { cours: 'Programmation', note: 9, credit: 6 },
      ],
    },
    {
      nom: 'Alice Mambu',
      matricule: 'ETU124',
      promotion: 'L2 Informatique',
      notes: [
        { cours: 'Anglais', note: 11, credit: 2 },
        { cours: 'Base de données', note: 16, credit: 5 },
      ],
    },
    {
      nom: 'Kevin Badi',
      matricule: 'ETU200',
      promotion: 'L1 Informatique',
      notes: [
        { cours: 'Algorithmique', note: 12, credit: 3 },
        { cours: 'Réseaux', note: 13, credit: 4 },
      ],
    },
  ];

  getDeliberationParPromotion(promo: string) {
    return this.mockData.filter((e) => e.promotion === promo);
  }
}
