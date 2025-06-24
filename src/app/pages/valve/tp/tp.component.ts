import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { TpService } from './../../../core/services/tp.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-tp',
  imports: [ CommonModule],
  templateUrl: './tp.component.html',
  styleUrl: './tp.component.css'
})
export class TPComponent {
  private tpService: TpService = inject(TpService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  tpsDisponibles: any[] = [];
  tpSelectionne: any = null;
  promotionLabel: string = '';

  async ngOnInit() {
  try {
    const etudiant = await this.authService.getEtudiantConnecte();

    if (!etudiant || !etudiant.promotion || !etudiant.promotion._id || !etudiant.promotion.section?._id) {
      throw new Error("Informations incomplètes de l'étudiant connecté");
    }

    const promotionId = etudiant.promotion._id;
    const sectionId = etudiant.promotion.section._id;

    this.promotionLabel = `${etudiant.promotion.nom} - ${etudiant.promotion.section.name}`;

    const tps = await this.tpService.getTPByPromoAndSection(promotionId, sectionId);

    // ✅ Filtrer les TPs dont la date limite est dépassée
    const maintenant = new Date();
    this.tpsDisponibles = tps.filter((tp: any) => {
      const deadline = new Date(tp.deadline);
      return deadline.getTime() >= maintenant.getTime(); // seulement ceux encore valides
    });
  } catch (err: any) {
    console.error(err);
  }
}

joursRestants(deadlineStr: string): number {
  const now = new Date();
  const deadline = new Date(deadlineStr);
  const diff = deadline.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

  voirDetails(tp: any) {
    this.router.navigate(['/valveetudiants/tp/edit', tp._id]); // 👈 rediriger vers la page détails
  }

  getFileUrl(path: string): string {
  return `http://localhost:5000${path}`;
}
}
