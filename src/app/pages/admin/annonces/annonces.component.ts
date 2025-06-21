import { AnnoncesAddComponent } from './../annonces-add/annonces-add.component';
import { ListAnnonceComponent } from './../list-annonce/list-annonce.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-annonces',
  imports: [CommonModule, ListAnnonceComponent, AnnoncesAddComponent],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.css'
})
export class AnnoncesComponent {
  ongletActif: string = 'liste';

  afficherListe() {
    this.ongletActif = 'liste';
  }

  afficherFormulaire() {
    this.ongletActif = 'Ajout';
  }
}
