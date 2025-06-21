import { ActivatedRoute, RouterLink } from '@angular/router';
import { HoraireItem } from './../../../core/models/horaire';
import { HoraireService } from './../../../core/services/horaire.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-list-horaire',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-horaire.component.html',
  styleUrl: './list-horaire.component.css'
})
export class ListHoraireComponent {
  horaires: HoraireItem[] = [];
  filteredHoraires: HoraireItem[] = [];
  isError = false;
  message: string | null = null;
  promotionId: string | null = null;

  groupedByDay: { [key: string]: HoraireItem[] } = {};

  private route = inject(ActivatedRoute);
  private horaireService = inject(HoraireService);

  groupHorairesByDay(horaires: HoraireItem[]) {
    this.groupedByDay = {};
    for (let h of horaires) {
      if (!this.groupedByDay[h.jour]) this.groupedByDay[h.jour] = [];
      this.groupedByDay[h.jour].push(h);
    }
  }

  async ngOnInit() {
  this.promotionId = this.route.snapshot.paramMap.get('promotionId');

  if (!this.promotionId) {
    this.message = "Promotion introuvable dans l'URL.";
    this.isError = true;
    return;
  }

  try {
    this.horaires = await this.horaireService.getAllHoraires();

    // Ajout important : conversion en string pour bien comparer
    this.filteredHoraires = this.horaires.filter(
      h => String(h.cours?.promotion?._id) === String(this.promotionId)
    );

    this.groupHorairesByDay(this.filteredHoraires);
  } catch (err: any) {
    this.message = err.message || "Erreur lors du chargement des horaires.";
    this.isError = true;
  }
}

  hasCoursesForDay(day: string): boolean {
    return Array.isArray(this.groupedByDay[day]) && this.groupedByDay[day].length > 0;
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }

  async deleteHoraire(id: string) {
  if (!confirm("Voulez-vous vraiment supprimer cet horaire ?")) return;

  try {
    await this.horaireService.deleteHoraire(id);
    this.filteredHoraires = this.filteredHoraires.filter(h => h._id !== id);
    this.groupHorairesByDay(this.filteredHoraires);
    this.message = "Horaire supprimé avec succès.";
    this.isError = false;
  } catch (err: any) {
    this.message = err.message || "Erreur lors de la suppression de l'horaire.";
    this.isError = true;
  }
}

}
