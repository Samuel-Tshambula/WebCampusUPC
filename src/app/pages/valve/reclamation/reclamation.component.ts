import { Component } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reclamation',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.css'
})
export class ReclamationComponent {
  confirmation = false;

  constructor() {}

    reclamationForm = new FormGroup ({
      type : new FormControl('',[Validators.required]),
      objet: new FormControl('',[Validators.required, Validators.minLength(3)]),
      message: new FormControl('',[Validators.required, Validators.minLength(10)]),
    });
  

  envoyerReclamation() {
    if (this.reclamationForm.valid) {
      const data = this.reclamationForm.value;

      // Simule l'envoi au backend
      console.log('Réclamation envoyée :', data);

      // Réinitialisation + message succès
      this.reclamationForm.reset();
      this.confirmation = true;

      setTimeout(() => this.confirmation = false, 4000);
    }
  }
}
