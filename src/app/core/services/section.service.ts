import { SectionResponse, Section } from './../models/section';
import { CookieService } from './cookie.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

private URL = 'http://localhost:5000/api/section';
  private cookie: CookieService = inject(CookieService);

  async addSection(name: string): Promise<SectionResponse> {
    const token = this.cookie.get('token');

    const response = await fetch(this.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Erreur lors de la création de la section.');
    }

    return await response.json();
  }

  async getAllSections(): Promise<Section[]> {
    const token = this.cookie.get('token');
    const response = await fetch(this.URL, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    return data
  }

  async deleteSection(id: string): Promise<void> {
    const token = this.cookie.get('token');
    await fetch(`${this.URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async getSectionById(id: string): Promise<Section> {
    const token = this.cookie.get('token');
    const response = await fetch(`${this.URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Impossible de charger la section');
    }

    return await response.json();
  }

  async updateSection(id: string, name: string): Promise<{ message: string }> {
    const token = this.cookie.get('token');
    const response = await fetch(`${this.URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Échec de la mise à jour');
    }

    return await response.json();
  }

}
