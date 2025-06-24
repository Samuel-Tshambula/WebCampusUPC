import { CookieService } from './cookie.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TpService {

  private baseUrl = 'http://localhost:5000/api/tp';
  private cookie : CookieService = inject(CookieService);

   async publierTP(data: FormData): Promise<any> {
    const token = this.cookie.get('token');
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token || ''}`
      },
      body: data
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la publication du TP');
    }

    return await response.json();
  }

  async getTPByPromoAndSection(promotionId: string, idnonutile: string): Promise<any[]> {
  const token = this.cookie.get('token');
  const response = await fetch(`${this.baseUrl}/promotion/${promotionId}/section/${idnonutile}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors du chargement des TPs.');
  }

  return await response.json();
}

  async getTPById(tpId: string): Promise<any> {
    const res = await fetch(`http://localhost:5000/api/tp/${tpId}`);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur lors de la récupération du TP');
    }

    const data = await res.json();
    return data.tp;
  }
}
