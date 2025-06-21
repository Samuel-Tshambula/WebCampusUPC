import { CoursAddComponent } from './../cours-add/cours-add.component';
import { ListCoursComponent } from './../list-cours/list-cours.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cours',
  imports: [CommonModule, ListCoursComponent, CoursAddComponent],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent {
  ongletActif: string = 'liste';

  afficherListe() {
    this.ongletActif = 'liste';
  }

  afficherFormulaire() {
    this.ongletActif = 'Ajout';
  }
}
