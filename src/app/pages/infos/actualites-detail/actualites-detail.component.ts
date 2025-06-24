import { CommonModule } from '@angular/common';
import { ActualiteService } from './../../../core/services/actualite.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-actualites-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './actualites-detail.component.html',
  styleUrl: './actualites-detail.component.css'
})
export class ActualitesDetailComponent {
  route : ActivatedRoute = inject(ActivatedRoute);
  actualiteService : ActualiteService = inject(ActualiteService);
  actualite : any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.actualiteService.getActualiteById(id).then((data) => {
        this.actualite = data;
      }).catch((err) => {
        console.error('Erreur lors de la récupération de l’actualité:', err);
        this.actualite = { message: 'Erreur lors de la récupération de l’actualité.' };
      });
    }
  }

  getImageUrl(imagePath: string): string {
    return `http://localhost:5000${imagePath}`;
  }
}
