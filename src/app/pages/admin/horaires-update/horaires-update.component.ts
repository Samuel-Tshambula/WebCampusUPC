import { CommonModule } from '@angular/common';
import { CoursService } from './../../../core/services/cours.service';
import { HoraireService } from './../../../core/services/horaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-horaires-update',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './horaires-update.component.html',
  styleUrl: './horaires-update.component.css'
})
export class HorairesUpdateComponent {
  private horaireService: HoraireService = inject(HoraireService);
  private courseService: CoursService = inject(CoursService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  horaireId: string = '';
  courses: any[] = [];

  horaireForm = new FormGroup({
    jour: new FormControl('', Validators.required),
    heure_debut: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([0-1]\d|2[0-3]):[0-5]\d$/),
    ]),
    heure_fin: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([0-1]\d|2[0-3]):[0-5]\d$/),
    ]),
    salle: new FormControl('', Validators.required),
    cours: new FormControl('', Validators.required),
  });

  message: string | null = null;
  isError = false;
  jours: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  async ngOnInit() {
    this.horaireId = this.route.snapshot.paramMap.get('id') || '';

    try {
      const [horaire, allCourses] = await Promise.all([
        this.horaireService.getHoraireById(this.horaireId),
        this.courseService.getAllCourses(),
      ]);

      this.courses = allCourses;

      this.horaireForm.setValue({
        jour: horaire.jour || '',
        heure_debut: horaire.heure_debut || '',
        heure_fin: horaire.heure_fin || '',
        salle: horaire.salle || '',
        cours: horaire.cours._id || '', // On suppose que cours est un objet
      });

    } catch (err: any) {
      this.message = err.message || 'Erreur de chargement';
      this.isError = true;
    }
  }

  async submitForm() {
    if (this.horaireForm.invalid) return;
    const data = this.horaireForm.getRawValue();

    try {
      await this.horaireService.updateHoraire(this.horaireId, {
        jour: data.jour || '',
        heure_debut: this.formatTime(data.heure_debut || ''),
        heure_fin: this.formatTime(data.heure_fin || ''),
        salle: data.salle || '',
        cours: data.cours || '',
      });

      this.message = 'Horaire mis à jour avec succès';
      this.isError = false;

      // Rediriger ou autre logique après succès
      // this.router.navigate(['/admin/horaires']);
    } catch (err: any) {
      this.message = err.message || 'Erreur lors de la mise à jour';
      this.isError = true;
    }
  }

  formatTime(value: string | null): string {
    if (!value) return '';
    return value.slice(0, 5); // HH:mm
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
