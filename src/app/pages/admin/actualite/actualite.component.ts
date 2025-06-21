import { ActualiteAddComponent } from './../actualite-add/actualite-add.component';
import { ListActualiteComponent } from './../list-actualite/list-actualite.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-actualite',
  imports: [CommonModule, ListActualiteComponent, ActualiteAddComponent],
  templateUrl: './actualite.component.html',
  styleUrl: './actualite.component.css'
})
export class ActualiteComponent {
  ongletActif: string = 'liste';

  afficherListe() {
    this.ongletActif = 'liste';
  }

  afficherFormulaire() {
    this.ongletActif = 'Ajout';
  }
}
