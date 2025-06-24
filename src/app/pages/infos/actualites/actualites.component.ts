import { ActualiteAll } from './../../../core/models/actualite';
import { ActualiteService } from './../../../core/services/actualite.service';
import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualites',
  imports: [RouterLink, NgFor, CommonModule], // commonModule permet d'utiliser les directives Angular de base comme ngFor et ngIf ou encore les pipes slice, date, uppercase, lowercase, etc.
  templateUrl: './actualites.component.html',
  styleUrl: './actualites.component.css'
})
export class ActualitesComponent {
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
}
