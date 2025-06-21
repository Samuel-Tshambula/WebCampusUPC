import { CookieService } from './cookie.service';
import { Horaire, HoraireItem } from './../models/horaire';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HoraireService {

  constructor() { }

    horaires = [
    {
      promotion: 'L2 Informatique',
      jour: 'Lundi',
      heure: '08h00 - 10h00',
      cours: 'Programmation Web',
      prof: 'M. Kabila',
      salle: 'B201',
    },
    {
      promotion: 'L2 Informatique',
      jour: 'Mercredi',
      heure: '10h00 - 12h00',
      cours: 'Réseaux',
      prof: 'Mme. Tshisekedi',
      salle: 'B103',
    },
    {
      promotion: 'L1 Droit',
      jour: 'Mardi',
      heure: '08h00 - 10h00',
      cours: 'Introduction au Droit',
      prof: 'M. Lumumba',
      salle: 'A102',
    },
  ];

  getHorairesParPromotion(promotion: string) {
    return this.horaires.filter(h => h.promotion === promotion);
  }

  private BASE_URL = 'http://localhost:5000/api/schedule';
  private cookie: CookieService = inject(CookieService);

  async createHoraire(horaire: Horaire): Promise<{ message: string }> {
    const token = this.cookie.get('token');

    const response = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(horaire),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Erreur lors de la création de l’horaire');
    }

    return await response.json();
  }

  async getAllHoraires(): Promise<HoraireItem[]> {
    const token = this.cookie.get('token');
    const res = await fetch(this.BASE_URL, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) throw new Error('Erreur lors du chargement des horaires');
    return await res.json();
  }

  async deleteHoraire(id: string): Promise<void> {
  let token = this.cookie.get('token');
  const res = await fetch(`http://localhost:5000/api/schedule/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erreur lors de la suppression de l'horaire.");
  }
}

async getHoraireById(id: string): Promise<any> {
  const token = this.cookie.get('token');
  const res = await fetch(`${this.BASE_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erreur lors de la récupération de l’horaire');
  }

  return await res.json();
}

async updateHoraire(id: string, data: Horaire): Promise<{ message: string }> {
  const token = this.cookie.get('token');
  const response = await fetch(`${this.BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Erreur lors de la mise à jour');
  }

  return await response.json();
}

}
