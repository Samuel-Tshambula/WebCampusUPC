import { ListPromotionsComponent } from './../list-promotions/list-promotions.component';
import { PromotionsAddComponent } from './../promotions-add/promotions-add.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-promotions',
  imports: [CommonModule, PromotionsAddComponent, ListPromotionsComponent],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.css'
})
export class PromotionsComponent {
    ongletActif: string = 'liste';

  afficherListe() {
    this.ongletActif = 'liste';
  }

  afficherFormulaire() {
    this.ongletActif = 'Ajout';
  }
}
