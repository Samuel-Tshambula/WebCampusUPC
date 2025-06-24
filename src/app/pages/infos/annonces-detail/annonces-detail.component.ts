import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnnonceService } from './../../../core/services/annonce.service';
import { AnnonceItem } from './../../../core/models/annonce';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-annonces-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './annonces-detail.component.html',
  styleUrl: './annonces-detail.component.css'
})
export class AnnoncesDetailComponent {
  annonce: AnnonceItem | null = null;
  private annonceService: AnnonceService = inject(AnnonceService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        this.annonce = await this.annonceService.getAnnonceById(id);
      } catch (error) {
        console.error(error);
        this.router.navigate(['/infos/annonces']); // redirection en cas d'erreur
      }
    }
  }
}
