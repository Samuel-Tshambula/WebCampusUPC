import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tp',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tp.component.html',
  styleUrl: './tp.component.css'
})
export class TpComponent {
   tpForm = new FormGroup({
    promotion: new FormControl('', Validators.required),
    titre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  promotions = ['L1 Info', 'L2 Info', 'L3 Info', 'M1 Info', 'M2 Info'];
  selectedFile: File | null = null;
  tpsPublies: any[] = [];
  filtrePromotion: string = '';
  confirmation = false;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  submitTP() {
    if (this.tpForm.valid) {
      const now = new Date();
      const tpData = {
        ...this.tpForm.value,
        fichier: this.selectedFile?.name || 'Aucun fichier',
        date: now.toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };

      this.tpsPublies.push(tpData);
      this.tpForm.reset();
      this.selectedFile = null;
      this.confirmation = true;

      setTimeout(() => this.confirmation = false, 4000);
    }
  }
}
