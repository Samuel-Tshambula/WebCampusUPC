import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AnnonceItem, AnnonceResponse } from './../../../core/models/annonce';
import { AnnonceService } from './../../../core/services/annonce.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-annonces-add',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './annonces-add.component.html',
  styleUrl: './annonces-add.component.css'
})
export class AnnoncesAddComponent {
  annonceService: AnnonceService = inject(AnnonceService);
  isOpen = false;
  isError = false;
  message: string | null = null;

  annonceForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  submitAnnonce() {
    const title = this.annonceForm.value.title ?? '';
    const description = this.annonceForm.value.description ?? '';
    this.annonceService.addAnnonce(title, description)
      .then((data: AnnonceResponse) => {
        
        this.annonceService.annonceArray.unshift(data.annonce); // on ajoute uniquement l'objet `annonce`
        this.message = data.message;
        this.isOpen = true;
        this.annonceForm.reset();
      })
      .catch((err) => {
        this.message = err.message;
        this.isError = true;
      });
  }

  close() {
    this.isOpen = false;
    this.isError = false;
  }
}
