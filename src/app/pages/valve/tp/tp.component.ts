import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tp',
  imports: [ CommonModule],
  templateUrl: './tp.component.html',
  styleUrl: './tp.component.css'
})
export class TPComponent {
   promotion = 'L1 Info';

  tpsPromotion: any[] = [
    {
      id: 1,
      cours: 'Programmation Web',
      enseignant: 'M. MUKENDI',
      description: 'Créer un mini-site avec HTML/CSS.',
      date: '2025-06-01',
      dateLimite: '2025-06-06'
    },
    {
      id: 2,
      cours: 'Anglais',
      enseignant: 'M. LUBANGULA',
      description: 'Speak english whith me on Zoom.',
      date: '2025-06-05',
      dateLimite: '2025-06-10'
    },
    {
      id: 3,
      cours: 'Réseaux',
      enseignant: 'Mme KAPINGA',
      description: 'Configurer une topologie réseau sous Cisco Packet Tracer.',
      date: '2025-05-30',
      dateLimite: '2025-06-02'
    }
  ];

  tpsDisponibles: any[] = [];
  tpSelectionne: any = null;

  ngOnInit() {
    const now = new Date();
    this.tpsDisponibles = this.tpsPromotion.filter(tp => new Date(tp.dateLimite) > now); // Filtrer les TPs dont la date limite est dans le futur
  }

  voirDetails(tp: any) {
    this.tpSelectionne = tp;
  }

  fermerDetails() {
    this.tpSelectionne = null;
  }

  joursRestants(dateLimite: string): number {
    const diff = new Date(dateLimite).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
}
