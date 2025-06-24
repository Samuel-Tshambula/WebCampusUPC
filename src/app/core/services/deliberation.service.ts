import { CookieService } from './cookie.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliberationService {

  constructor() { }

  private mockData = [
    {
      nom: 'Jean Kongo',
      matricule: 'ETU123',
      promotion: 'L2 Informatique',
      notes: [
        { cours: 'Mathématiques', note: 14, credit: 4 },
        { cours: 'Programmation', note: 9, credit: 6 },
      ],
    },
    {
      nom: 'Alice Mambu',
      matricule: 'ETU124',
      promotion: 'L2 Informatique',
      notes: [
        { cours: 'Anglais', note: 11, credit: 2 },
        { cours: 'Base de données', note: 16, credit: 5 },
      ],
    },
    {
      nom: 'Kevin Badi',
      matricule: 'ETU200',
      promotion: 'L1 Informatique',
      notes: [
        { cours: 'Algorithmique', note: 12, credit: 3 },
        { cours: 'Réseaux', note: 13, credit: 4 },
      ],
    },
  ];

  getDeliberationParPromotion(promo: string) {
    return this.mockData.filter((e) => e.promotion === promo);
  }

  private API_URL = 'http://localhost:5000/api/deliberation/admin';
  private BASE_URL = 'http://localhost:5000/api/deliberation/';
  cookie : CookieService = inject(CookieService);

  private async fetchJson(API_URL: string, options: RequestInit = {}) {
    const res = await fetch(API_URL, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        // Inclure le token si nécessaire
        Authorization: `Bearer ${this.cookie.get('token')}`,
        ...options.headers,
      },
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Erreur réseau');
    return res.json();
  }

  // ✅ Récupérer toutes les promotions
  // ✅ Récupérer toutes les délibérations d'une promotion
  async getDeliberationsByPromotion(promotionId: string): Promise<any[]> {
    return this.fetchJson(`${this.API_URL}/promotion/${promotionId}`);
  }

  async getDeliberationsByPromotionEtud(): Promise<any[]> {
    const token = this.cookie.get('token'); 
    const rep = await fetch(`${this.BASE_URL}`, {
      headers: {
        'Authorization': `Bearer ${this.cookie.get('token')}`,
      }
    });
    if (!rep.ok) {
      const err = await rep.json();
      throw new Error(err.message || 'Erreur lors de l’ajout.');
    }

    return await rep.json();
  }

  async ajouterDeliberation(data: { student: string; course: string; grade: number }) {
    const token = this.cookie.get('token'); // ou depuis un service Auth
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Nécessaire car `verifyAdminToken`
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Erreur lors de l’ajout.');
    }

    return await response.json();
  }

  async supprimerDeliberation(id: string): Promise<void> {
      const res = await fetch(`${this.API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.cookie.get('token')}`,
        }
      });

      if (!res.ok) throw new Error((await res.json()).message || 'Erreur lors de la suppression');
    }

    async getDeliberationById(id: string): Promise<any> {
      return this.fetchJson(`${this.API_URL}/${id}`);
    }

    async updateDeliberation(id: string, data: { student: string; course: string; grade: number }): Promise<any> {
      const res = await fetch(`${this.API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.cookie.get('token')}`,
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error((await res.json()).message || 'Erreur lors de la mise à jour');
      return res.json();
    }

    async getDeliberationsByEtudiant(): Promise<any[]> {
    const token = this.cookie.get('token');

    const response = await fetch(`${this.BASE_URL}student/deliberation`,{ 
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la récupération des délibérations');
    }

    return await response.json();
  }
}
