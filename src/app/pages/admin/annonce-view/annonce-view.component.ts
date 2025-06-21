import { CommonModule } from '@angular/common';
import { AnnonceItem } from './../../../core/models/annonce';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnnonceService } from './../../../core/services/annonce.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-annonce-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './annonce-view.component.html',
  styleUrl: './annonce-view.component.css'
})
export class AnnonceViewComponent {
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
        this.router.navigate(['/admin/annonces']); // redirection en cas d'erreur
      }
    }
  }
}
