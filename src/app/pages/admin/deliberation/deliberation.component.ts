import { CommonModule } from '@angular/common';
import { DeliberationAddComponent } from './../deliberation-add/deliberation-add.component';
import { PromotionDeliberationComponent } from './../promotion-deliberation/promotion-deliberation.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-deliberation',
  imports: [PromotionDeliberationComponent, DeliberationAddComponent, CommonModule],
  templateUrl: './deliberation.component.html',
  styleUrl: './deliberation.component.css'
})
export class DeliberationComponent {
  ongletActif: string = 'liste';

  afficherListe() {
    this.ongletActif = 'liste';
  }

  afficherFormulaire() {
    this.ongletActif = 'Ajout';
  }
}
