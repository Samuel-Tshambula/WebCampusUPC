import { AnnonceItem } from './../../../core/models/annonce';
import { AnnonceService } from './../../../core/services/annonce.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-annonces',
  imports: [CommonModule, RouterLink],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.css'
})
export class AnnoncesComponent {
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
}
