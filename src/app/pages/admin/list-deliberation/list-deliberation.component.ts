import { DeliberationService } from './../../../core/services/deliberation.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-list-deliberation',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-deliberation.component.html',
  styleUrl: './list-deliberation.component.css'
})
export class ListDeliberationComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private deliberationService: DeliberationService = inject(DeliberationService);

  error: string | null = null;
  message: string | null = null;

  allCourses: any[] = [];
  studentRows: {
    fullName: string;
    cardNumber: string;
    notes: { [courseId: string]: { grade: number; deliberationId: string } | undefined };
    average: number;
    hasAllGrades: boolean;
    isValidated: boolean;
  }[] = [];

  async ngOnInit() {
    const promotionId = this.route.snapshot.paramMap.get('promotionId');
    if (!promotionId) return;

    try {
      const data = await this.deliberationService.getDeliberationsByPromotion(promotionId);
      this.loadDeliberations(data);
    } catch (err: any) {
      this.error = err.message || 'Erreur de chargement';
    }
  }

  private loadDeliberations(data: any[]) {
    // Extraire tous les cours de la promotion
    const courseMap = new Map<string, any>();
    for (const d of data) {
      if (d.course?._id) {
        courseMap.set(d.course._id, d.course);
      }
    }
    this.allCourses = Array.from(courseMap.values());

    // Grouper les délibérations par étudiant
    const studentMap = new Map<string, {
      fullName: string;
      cardNumber: string;
      notes: { [courseId: string]: { grade: number; deliberationId: string } };
    }>();

    for (const d of data) {
      const sid = d.student._id;
      if (!studentMap.has(sid)) {
        studentMap.set(sid, {
          fullName: d.student.fullName,
          cardNumber: d.student.cardNumber,
          notes: {}
        });
      }
      if (d.course?._id) {
        studentMap.get(sid)!.notes[d.course._id] = {
          grade: d.grade,
          deliberationId: d._id
        };
      }
    }

    // Construire les lignes d’étudiants avec calculs
    this.studentRows = Array.from(studentMap.values()).map(student => {
      const notes = student.notes;
      const grades = this.allCourses
        .map(c => notes[c._id]?.grade)
        .filter(g => g !== undefined) as number[];

      const total = grades.reduce((sum, g) => sum + g, 0);
      const average = grades.length ? parseFloat((total / grades.length).toFixed(2)) : 0;
      const hasAllGrades = this.allCourses.every(c => notes[c._id] !== undefined);

      return {
        ...student,
        notes,
        average,
        hasAllGrades,
        isValidated: average >= 10
      };
    });
  }

  async onDelete(deliberationId: string) {
    if (!deliberationId) return;

    if (!confirm('Voulez-vous vraiment supprimer cette délibération ?')) {
      return;
    }

    try {
      await this.deliberationService.supprimerDeliberation(deliberationId);

      // Recharge la liste après suppression
      const promotionId = this.route.snapshot.paramMap.get('promotionId');
      if (promotionId) {
        const data = await this.deliberationService.getDeliberationsByPromotion(promotionId);
        this.loadDeliberations(data);
      }

      this.message = 'Délibération supprimée avec succès.';
      this.error = null;
    } catch (err: any) {
      this.error = err.message || 'Erreur lors de la suppression';
    }
  }
}
