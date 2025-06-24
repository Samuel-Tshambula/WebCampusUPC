import { AuthService } from './../../../core/services/auth.service';
import { CoursService } from './../../../core/services/cours.service';
import { TpService } from './../../../core/services/tp.service';
import { Component, inject } from '@angular/core';
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
      deadline: new FormControl('', Validators.required) // 👈 ajouté
    });


  coursAvecPromotion : Array<{ label: string; value: string }> = [];
  selectedFile: File | null = null;
  tpsPublies: any[] = [];

  confirmation: boolean = false;
  isError: boolean = false;
  message: string = '';

  private tpService = inject(TpService);
  private coursService = inject(CoursService);
  private authService = inject(AuthService);

  async ngOnInit() {
  try {
    const prof = await this.authService.getEnseignantConnecte();
    if (!prof || !prof._id) throw new Error("Enseignant non valide");

    const response = await this.coursService.getCoursEnseignes(prof._id);
    // response.courses : tableau des cours avec promotion

    // On garde tous les cours, chaque cours contient sa promotion
    this.coursAvecPromotion = response.courses.map((c: any) => ({
      label: `${c.title} - ${c.promotion.nom} ${c.promotion.section.name}`,
      value: c.promotion.id, // ✅ Utilise bien "id", pas "_id"
    }));
  } catch (error: any) {
    this.isError = true;
    this.message = `Erreur lors du chargement des promotions : ${error.message}`;
  }
}

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async submitTP() {
    this.isError = false;
    this.message = '';

    if (this.tpForm.invalid) {
      this.isError = true;
      this.message = 'Veuillez remplir correctement tous les champs.';
      return;
    }

    const { titre, description, promotion, deadline } = this.tpForm.value;

    if (!titre || !description || !promotion || !deadline) {
      this.isError = true;
      this.message = 'Tous les champs sont requis.';
      return;
    }

    const formData = new FormData();
    formData.append('title', titre);
    formData.append('description', description);
    formData.append('promotion', promotion);
    formData.append('deadline', deadline); // 👈 ajouté

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    try {
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]);
      }
      const response = await this.tpService.publierTP(formData);
      this.tpsPublies.push(response.tp);
      this.tpForm.reset();
      this.selectedFile = null;
      this.confirmation = true;

      setTimeout(() => (this.confirmation = false), 4000);
    } catch (error: any) {
      this.isError = true;
      this.message = error.message || 'Erreur lors de la publication du TP.';
    }
  }

  closeAlert() {
    this.isError = false;
    this.message = '';
  }

}
