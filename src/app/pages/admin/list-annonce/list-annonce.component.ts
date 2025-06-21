import { AnnonceItem } from './../../../core/models/annonce';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { AnnonceService } from './../../../core/services/annonce.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-list-annonce',
  imports: [CommonModule, RouterLink, NgFor],
  templateUrl: './list-annonce.component.html',
  styleUrl: './list-annonce.component.css'
})
export class ListAnnonceComponent {
  pages: number[] = []
  annonceService : AnnonceService = inject(AnnonceService);
  paginatedAnnonces: AnnonceItem[] = []; 
 

  async ngOnInit() {
    await this.loadPage(1);
  }

  async loadPage(page: number) {
    await this.annonceService.getPaginatedAnnonces(page);
    this.paginatedAnnonces = this.annonceService.annonceArray;
    this.generatePages();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.annonceService.totalPages) {
      this.loadPage(page);
    }
  }

  generatePages() {
    this.pages = Array.from({ length: this.annonceService.totalPages }, (_, i) => i + 1);
  }

  get currentPage() {
    return this.annonceService.currentPage;
  }

  get totalPages() {
    return this.annonceService.totalPages;
  }

  deleteAnnonce(id: string) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
    this.annonceService.deleteAnnonce(id)
      .then(() => {
        this.paginatedAnnonces = this.paginatedAnnonces.filter(a => a._id !== id);
      })
      .catch(err => {
        console.error('Erreur lors de la suppression', err);
      });
  }
}
}
