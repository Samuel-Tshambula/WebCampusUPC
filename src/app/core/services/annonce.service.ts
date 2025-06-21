import { Injectable, inject } from '@angular/core';
import { AnnonceItem, AnnonceAll, AnnonceResponse } from './../models/annonce';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  annonceArray: AnnonceItem[] = [];
  private URL = 'http://localhost:5000/api/annonce';
  cookie: CookieService = inject(CookieService);
  totalPages: number = 1;
  currentPage: number = 1;

  async getPaginatedAnnonces(page: number = 1, limit: number = 5): Promise<void> {
    const token = this.cookie.get('token');
    const response = await fetch(`${this.URL}?page=${page}&limit=${limit}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data: AnnonceAll = await response.json();
    this.annonceArray = data.annonces;
    this.totalPages = data.totalPages;
    this.currentPage = data.currentPage;
  }

  async addAnnonce(title: string, description: string): Promise<AnnonceResponse> {
    const token = this.cookie.get('token');
    const response = await fetch(`${this.URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, description })
    });

    const data = await response.json();
    return data as AnnonceResponse;
  }

  async deleteAnnonce(id: string): Promise<void> {
    const token = this.cookie.get('token');
    await fetch(`${this.URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async getAnnonceById(id: string): Promise<AnnonceItem> {
    const token = this.cookie.get('token');
    const response = await fetch(`${this.URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement de l\'annonce');
    }

    return await response.json();
  }

  async updateAnnonce(id: string, title: string, description: string): Promise<{ message: string }> {
    const token = this.cookie.get('token');
    const response = await fetch(`${this.URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, description })
    });

    if (!response.ok) {
      throw new Error('Échec de la mise à jour');
    }

    return await response.json();
  }

}
