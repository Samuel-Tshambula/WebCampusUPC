import { AuthService } from './../../../core/services/auth.service';
import { HoraireService } from './../../../core/services/horaire.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horaires',
  imports: [CommonModule],
  templateUrl: './horaires.component.html',
  styleUrl: './horaires.component.css'
})
export class HorairesComponent {
  authService: AuthService = inject(AuthService);
  horaireService: HoraireService = inject(HoraireService);

  promotion: string = '';
  horaires: any[] = [];

  ngOnInit() {
    this.promotion = this.authService.getEtudiantConnecte()?.promotion || '';
    this.horaires = this.horaireService.getHorairesParPromotion(this.promotion);
  }
}
