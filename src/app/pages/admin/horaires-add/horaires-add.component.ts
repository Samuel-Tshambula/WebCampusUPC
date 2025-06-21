import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CoursService } from './../../../core/services/cours.service';
import { HoraireService } from './../../../core/services/horaire.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-horaires-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './horaires-add.component.html',
  styleUrl: './horaires-add.component.css'
})
export class HorairesAddComponent {
  private horaireService: HoraireService = inject(HoraireService);
  private courseService: CoursService = inject(CoursService);

  horaireForm = new FormGroup({
    jour: new FormControl('', Validators.required),
    heure_debut: new FormControl('', [Validators.required, Validators.pattern(/^([0-1]\d|2[0-3]):[0-5]\d$/)]),
    heure_fin: new FormControl('', [Validators.required, Validators.pattern(/^([0-1]\d|2[0-3]):[0-5]\d$/)]),
    salle: new FormControl('', Validators.required),
    cours: new FormControl('', Validators.required),
  });

  message: string | null = null;
  isError = false;
  courses: any[] = [];

  async ngOnInit() {
    try {
      this.courses = await this.courseService.getAllCourses();
    } catch (err: any) {
      this.message = err.message || 'Erreur de chargement des cours';
      this.isError = true;
    }
  }

  async submitHoraire() {
  if (this.horaireForm.invalid) return;

  const data = this.horaireForm.getRawValue();

  try {
    await this.horaireService.createHoraire({
      jour: data.jour || '',
      heure_debut: this.formatTime(data.heure_debut || ''),
      heure_fin: this.formatTime(data.heure_fin || ''),
      salle: data.salle || '',
      cours: data.cours || '',
    });

    this.message = 'Horaire créé avec succès';
    this.isError = false;
    this.horaireForm.reset();
  } catch (err: any) {
    this.message = err.message || 'Erreur lors de la création';
    this.isError = true;
  }
}

  // Force le format HH:mm
  formatTime(value: string | null): string {
    if (!value) return '';
    return value.slice(0, 5);
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
