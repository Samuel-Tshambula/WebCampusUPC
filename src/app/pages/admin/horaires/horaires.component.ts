import { PromotionHoraireComponent } from './../promotion-horaire/promotion-horaire.component';
import { CommonModule } from '@angular/common';
import { HorairesAddComponent } from './../horaires-add/horaires-add.component';
import { ListHoraireComponent } from './../list-horaire/list-horaire.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-horaires',
  imports: [PromotionHoraireComponent, HorairesAddComponent, CommonModule],
  templateUrl: './horaires.component.html',
  styleUrl: './horaires.component.css'
})
export class HorairesComponent {
  ongletActif: string = 'liste';

  afficherListe() {
    this.ongletActif = 'liste';
  }

  afficherFormulaire() {
    this.ongletActif = 'Ajout';
  }
}
