import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from './../../../core/services/student.service';
import { StudentItem, Student } from './../../../core/models/student';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-liste-promotion-etudiant',
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-promotion-etudiant.component.html',
  styleUrl: './liste-promotion-etudiant.component.css'
})
export class ListePromotionEtudiantComponent {
   private route: ActivatedRoute = inject(ActivatedRoute);
  private studentService = inject(StudentService);

  students: Student[] = [];
  searchTerm: string = '';
  message: string | null = null;
  isError: boolean = false;

  async ngOnInit() {
    const promotionId = this.route.snapshot.paramMap.get('promotionId');
    if (!promotionId) {
      this.message = "Promotion non spécifiée dans l'URL.";
      this.isError = true;
      return;
    }

    try {
      const data = await this.studentService.getStudentsByPromotion(promotionId);
      // Trier les étudiants par ordre alphabétique
      this.students = data.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } catch (err: any) {
      this.message = err.message || "Erreur lors du chargement des étudiants.";
      this.isError = true;
    }
  }

  get filteredStudents(): Student[] {
    const term = this.searchTerm.toLowerCase().trim();
    return this.students.filter(
      s =>
        s.fullName.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term)
    );
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
