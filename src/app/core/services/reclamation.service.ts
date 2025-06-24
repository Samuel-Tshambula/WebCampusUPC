import { Reclamation } from './../models/reclamation';
import { CookieService } from './cookie.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private API_URL = 'http://localhost:5000/api/reclamation';
  cookie : CookieService = inject(CookieService);

  async envoyerReclamation(data: {
    type: string;
    subject: string;
    message: string;
    teacher: string;
  }): Promise<Reclamation> {
    const token = this.cookie.get('token');

    const res = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // requis pour `verifyStudentToken`
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erreur lors de l'envoi");
    }

    return await res.json();
  }

  private baseUrl = 'http://localhost:5000/api/teacher/me/reclamations';

  async getReclamationsProfesseur(): Promise<any[]> {
    const token = this.cookie.get('token');
    const res = await fetch(this.baseUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur lors de la récupération des réclamations');
    }

    return await res.json();
  }
}
