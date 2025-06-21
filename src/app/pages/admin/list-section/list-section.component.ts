import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Section } from './../../../core/models/section';
import { SectionService } from './../../../core/services/section.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-list-section',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './list-section.component.html',
  styleUrl: './list-section.component.css'
})
export class ListSectionComponent {
  sectionService: SectionService = inject(SectionService);
  sections: Section[] = [];

  async ngOnInit() {
    await this.loadSections();
  }

  async loadSections() {
    try {
      this.sections = await this.sectionService.getAllSections();
    } catch (err) {
      console.error('Erreur de chargement des sections', err);
    }
  }

  async deleteSection(id: string) {
    if (confirm('Voulez-vous vraiment supprimer cette section ?')) {
      try {
        await this.sectionService.deleteSection(id);
        this.sections = this.sections.filter(s => s._id !== id);
      } catch (err) {
        console.error('Erreur lors de la suppression', err);
      }
    }
  }
}
