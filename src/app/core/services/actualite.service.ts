import { CookieService } from './cookie.service';
import { Actualite, ActualiteAll } from './../models/actualite';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {

  constructor() { }
  actualiteArray: ActualiteAll[] = []

  private apiUrl = 'http://localhost:5000/api/actualite';
  cookie : CookieService = inject(CookieService);

  async getAllActualites(): Promise<ActualiteAll[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la récupération des actualités');
    }
    return await response.json();
  }

  async addActualite(title: string, description: string, image: File): Promise<any> {
    let token = this.cookie.get('token')
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de l’envoi');
    }

    return await response.json();
  }

  async deleteActualite(id: string): Promise<void> {
    let token = this.cookie.get('token')
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la suppression de l’actualité');
    }
  }

  async updateActualite(id: string, title: string, description: string, image?: File): Promise<any> {
    let token = this.cookie.get('token')
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la mise à jour de l’actualité');
    }

    return await response.json();
  }


  async getActualiteById(id: string): Promise<Actualite> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la récupération de l’actualité');
    }
    return await response.json();
  }

}
