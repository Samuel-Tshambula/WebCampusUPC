import { ActualiteService } from './../../../core/services/actualite.service';
import { ActualiteAll } from './../../../core/models/actualite';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-list-actualite',
  imports: [RouterLink, CommonModule],
  templateUrl: './list-actualite.component.html',
  styleUrl: './list-actualite.component.css'
})
export class ListActualiteComponent {
  actualiteService : ActualiteService = inject(ActualiteService)
  actualites !: ActualiteAll[]
  backendUrl = 'http://localhost:5000'

  getImageUrl(imagePath: string): string {
    if (!imagePath) return 'assets/default-news.jpg'; // fallback
    if (imagePath.startsWith('http')) return imagePath;
    return `${this.backendUrl}${imagePath}`;
  }

  ngOnInit(): void {
    this.actualiteService.getAllActualites().then((data: ActualiteAll[]) => {
      this.actualiteService.actualiteArray = data;
      this.actualites = this.actualiteService.actualiteArray;
    }).catch(error => {
      console.error('Erreur lors de la récupération des actualités :', error);
    });
  }

  deleteActualite(id: string) {
    this.actualiteService.deleteActualite(id).then(() => {
      this.actualiteService.actualiteArray = this.actualiteService.actualiteArray.filter(actualite => actualite._id !== id);
      this.actualites = [...this.actualiteService.actualiteArray];
    }).catch(error => {
      console.error('Erreur lors de la suppression de l\'actualité :', error);
    });
  }
}
