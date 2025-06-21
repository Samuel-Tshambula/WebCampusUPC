import { FaculteAddComponent } from './../faculte-add/faculte-add.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListFaculteComponent } from "../list-faculte/list-faculte.component";

@Component({
  selector: 'app-faculte',
  imports: [CommonModule, ListFaculteComponent, FaculteAddComponent],
  templateUrl: './faculte.component.html',
  styleUrl: './faculte.component.css'
})
export class FaculteComponent {
     ongletActif: string = 'liste';

  afficherListe() {
    this.ongletActif = 'liste';
  }

  afficherFormulaire() {
    this.ongletActif = 'Ajout';
  }
}
