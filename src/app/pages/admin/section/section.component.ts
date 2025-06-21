import { SectionAddComponent } from './../section-add/section-add.component';
import { ListSectionComponent } from './../list-section/list-section.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-section',
  imports: [CommonModule, ListSectionComponent, SectionAddComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {
  ongletActif: string = 'liste';

  afficherListe() {
    this.ongletActif = 'liste';
  }

  afficherFormulaire() {
    this.ongletActif = 'Ajout';
  }
}
