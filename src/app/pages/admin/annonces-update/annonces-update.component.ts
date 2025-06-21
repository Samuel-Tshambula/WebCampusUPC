import { AnnonceService } from './../../../core/services/annonce.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-annonces-update',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './annonces-update.component.html',
  styleUrl: './annonces-update.component.css'
})
export class AnnoncesUpdateComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  annonceService: AnnonceService = inject(AnnonceService);

  isOpen = false;
  isError = false;
  message: string | null = null;

  annonceForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  annonceId: string = '';

  async ngOnInit() {
    this.annonceId = this.route.snapshot.paramMap.get('id') || '';

    try {
      const annonce = await this.annonceService.getAnnonceById(this.annonceId);
      this.annonceForm.patchValue({
        title: annonce.title,
        description: annonce.description
      });
    } catch (error) {
      this.message = 'Erreur lors du chargement de l\'annonce';
      this.isError = true;
    }
  }

  async submitAnnonce() {
    const title = this.annonceForm.value.title ?? '';
    const description = this.annonceForm.value.description ?? '';

    try {
      const updated = await this.annonceService.updateAnnonce(this.annonceId, title, description);
      this.message = updated.message;
      this.isOpen = true;
    } catch (err) {
      const error = err as Error;
      this.message = error.message;
      this.isError = true;
    }
  }

  close() {
    this.isOpen = false;
    this.isError = false;
  }
}
