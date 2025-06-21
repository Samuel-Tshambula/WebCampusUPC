import { NgIf } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActualiteService } from './../../../core/services/actualite.service';
import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-actualite-update',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './actualite-update.component.html',
  styleUrl: './actualite-update.component.css'
})
export class ActualiteUpdateComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  actualiteService: ActualiteService = inject(ActualiteService)

  actualite: any
  articleId: string | null = this.route.snapshot.paramMap.get('id');
  isOpen = false
  isError = false
  selectedImage?: File

  actualiteForm = new FormGroup({
    titre: new FormControl(''),
    description: new FormControl('')
  })

  ngOnInit(): void {
    if (this.articleId) {
      this.actualiteService.getActualiteById(this.articleId).then((data: any) => {
        this.actualite = data;
        this.actualiteForm.setValue({
          titre: data.title,
          description: data.description
        });
      }).catch((err) => {
        console.error('Erreur lors de la récupération :', err);
        this.isError = true;
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  edit() {
    const titre = this.actualiteForm.value.titre ?? '';
    const description = this.actualiteForm.value.description ?? '';
    this.actualiteService.updateActualite(this.articleId ?? '', titre, description, this.selectedImage)
      .then((data: any) => {
        this.actualite = data;
        this.isOpen = true;
      }).catch((err) => {
        console.error(err);
        this.isError = true;
      });
  }

  close() {
    this.isOpen = false;
    this.isError = false;
  }
}
