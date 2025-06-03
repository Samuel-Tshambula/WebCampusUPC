import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-annonces',
  imports: [CommonModule, RouterLink],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.css'
})
export class AnnoncesComponent {
    annonces = [
    {
      id: 1,
      titre: 'Suspension des cours L3',
      contenu: 'Les cours de la promotion L3 sont suspendus ce vendredi en raison...',
      date: new Date('2025-06-01'),
    },
    {
      id: 2,
      titre: 'Remise des attestations',
      contenu: 'Les étudiants de la promo L2 sont invités à retirer leurs attestations...',
      date: new Date('2025-06-02'),
    },
    // Ajoutez plus d'annonces ici
    {
      id: 2,
      titre: 'Remise des attestations',
      contenu: 'Les étudiants de la promo L2 sont invités à retirer leurs attestations...',
      date: new Date('2025-06-02'),
    },
    {
      id: 2,
      titre: 'Remise des attestations',
      contenu: 'Les étudiants de la promo L2 sont invités à retirer leurs attestations...',
      date: new Date('2025-06-02'),
    },
    {
      id: 2,
      titre: 'Remise des attestations',
      contenu: 'Les étudiants de la promo L2 sont invités à retirer leurs attestations...',
      date: new Date('2025-06-02'),
    },
    {
      id: 2,
      titre: 'Remise des attestations',
      contenu: 'Les étudiants de la promo L2 sont invités à retirer leurs attestations...',
      date: new Date('2025-06-02'),
    },
    {
      id: 2,
      titre: 'Remise des attestations',
      contenu: 'Les étudiants de la promo L2 sont invités à retirer leurs attestations...',
      date: new Date('2025-06-02'),
    },
    {
      id: 2,
      titre: 'Remise des attestations',
      contenu: 'Les étudiants de la promo L2 sont invités à retirer leurs attestations...',
      date: new Date('2025-06-02'),
    },
    {
      id: 2,
      titre: 'Remise des attestations',
      contenu: 'Les étudiants de la promo L2 sont invités à retirer leurs attestations...',
      date: new Date('2025-06-02'),
    },
  ];

  currentPage = 1;
  itemsPerPage = 6;

  get paginatedAnnonces() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.annonces.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.annonces.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
