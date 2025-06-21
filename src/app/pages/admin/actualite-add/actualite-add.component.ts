import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
// Tu dois créer ce modèle et ce service toi-même
import { ActualiteService } from './../../../core/services/actualite.service';
import { Actualite } from './../../../core/models/actualite';

@Component({
  selector: 'app-actualite-add',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './actualite-add.component.html',
  styleUrl: './actualite-add.component.css'
})
export class ActualiteAddComponent {
  actualiteService: ActualiteService = inject(ActualiteService);
  actualite: Actualite | null = null;
  isOpen: boolean = false;
  isError: boolean = false;
  selectedImage: File | null = null;

  actuForm = new FormGroup({
    titre: new FormControl(''),
    description: new FormControl('')
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
    }
  }

submitActualite() {
  const titre = this.actuForm.value.titre ?? '';
  const description = this.actuForm.value.description ?? '';

  if (!this.selectedImage || !titre || !description) {
    this.isError = true;
    this.actualite = { message: 'Tous les champs sont requis.' } as any;
    return;
  }

  this.actualiteService.addActualite(titre, description, this.selectedImage)
    .then((data: Actualite) => {
      this.actualite = data;
      this.actualiteService.actualiteArray.unshift(data.actualite);
      this.isOpen = true;
      this.actuForm.reset();
      this.selectedImage = null;
    })
    .catch((err) => {
      this.actualite = { message: err.message } as any;
      this.isError = true;
    });
  }

  close() {
    this.isOpen = false;
    this.isError = false;
  }
}

