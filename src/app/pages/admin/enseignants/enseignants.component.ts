import { EnseignantsAddComponent } from './../enseignants-add/enseignants-add.component';
import { ListEnseignantComponent } from './../list-enseignant/list-enseignant.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-enseignants',
  imports: [CommonModule, ListEnseignantComponent, EnseignantsAddComponent],
  templateUrl: './enseignants.component.html',
  styleUrl: './enseignants.component.css'
})
export class EnseignantsComponent {
  ongletActif: string = 'liste';

  afficherListe() {
    this.ongletActif = 'liste';
  }

  afficherFormulaire() {
    this.ongletActif = 'inscription';
  }
}
