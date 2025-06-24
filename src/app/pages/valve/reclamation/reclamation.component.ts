import { ReclamationService } from './../../../core/services/reclamation.service';
import { AuthAdminService } from './../../../core/services/auth-admin.service';
import { Component, inject } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reclamation',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.css'
})
export class ReclamationComponent {
  private reclamationService: ReclamationService = inject(ReclamationService);
  private enseignantService: AuthAdminService = inject(AuthAdminService);

  enseignants: any[] = [];
  confirmation = false;

  reclamationForm = new FormGroup({
    type: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
  });

  async ngOnInit() {
    try {
      this.enseignants = await this.enseignantService.getAllTeachersStudent();
    } catch (error) {
      console.error("Erreur lors du chargement des enseignants", error);
    }
  }

  async envoyerReclamation() {
    if (this.reclamationForm.invalid) return;

    const raw = this.reclamationForm.getRawValue();
    const data = {
      type: raw.type ?? '',
      subject: raw.subject ?? '',
      message: raw.message ?? '',
      teacher: raw.teacher ?? ''
    };

    try {
      await this.reclamationService.envoyerReclamation(data);
      this.confirmation = true;
      this.reclamationForm.reset();
    } catch (err: any) {
      alert(err.message || "Erreur lors de l'envoi.");
    }
  }
}
