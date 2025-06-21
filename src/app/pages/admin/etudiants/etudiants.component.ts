import { NgIf, CommonModule } from '@angular/common';
import { EtudiantsAddComponent } from './../etudiants-add/etudiants-add.component';
import { ListEtudiantsComponent } from './../list-etudiants/list-etudiants.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-etudiants',
  imports: [ListEtudiantsComponent, EtudiantsAddComponent, NgIf, CommonModule],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css'
})
export class EtudiantsComponent {
  ongletActif: string = 'liste';

  afficherListe() {
    this.ongletActif = 'liste';
  }

  afficherFormulaire() {
    this.ongletActif = 'inscription';
  }
}
