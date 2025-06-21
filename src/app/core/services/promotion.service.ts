import { Faculte, FaculteAll } from './../models/faculte';
import { CookieService } from './cookie.service';
import { Promotion, PromotionItem } from './../models/promotion';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private URL = 'http://localhost:5000/api/promotion'
  cookie : CookieService = inject(CookieService)
  promotionArray : Promotion | [] = []
  faculteArray : FaculteAll[] = []

  constructor() { }

async addPromotion(nom: string, section: string, faculty: string): Promise<{ message: string }> {
    const token = this.cookie.get('token');

    const response = await fetch(this.URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nom, section, faculty })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Erreur d’ajout');
    }

    return await response.json();
  }

   async getAllPromotions(): Promise<PromotionItem[]> {
    const response = await fetch(this.URL);
    if (!response.ok) throw new Error('Erreur lors du chargement des promotions');
    return await response.json();
  }

  async deletePromotion(id: string): Promise<{ message: string }> {
    const token = this.cookie.get('token'); // ou via CookieService
    const response = await fetch(`${this.URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  }

  async getPromotionById(id: string): Promise<any> {
    const res = await fetch(`${this.URL}/${id}`);
    if (!res.ok) throw new Error('Erreur lors du chargement de la promotion');
    return await res.json();
  }

  async updatePromotion(id: string, nom: string, section: string, faculty: string): Promise<{ message: string }> {
    const token = this.cookie.get('token');
    const res = await fetch(`${this.URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nom, section, faculty })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur de mise à jour');
    }

    return await res.json();
  }



  // Partie faculté

  async addFaculte(name:string): Promise<Faculte>{
    const faculte = {
      nom: name
    }

    const token = this.cookie.get('token') ?? '';

    try {
      let rep = await fetch('http://localhost:5000/api/'+'faculty', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(faculte)
    })
      const data = await rep.json();

      if (!rep.ok) {
        return Promise.reject(data);
      }

      return data as Faculte;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la faculté :', error);
      throw error;
    }
  }
  async faculteAll(): Promise<FaculteAll[]>{
    let rep = await fetch('http://localhost:5000/api/faculty').then(res => res.json())

    return rep
  }

  async deleteFaculte(id: string): Promise<void> {
    const token = this.cookie.get('token') ?? '';
    try {
      const response = await fetch(`http://localhost:5000/api/faculty/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        return Promise.reject(errorData);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la faculté :', error);
      throw error;
    }
  }

  async getFaculteById(id: string): Promise<Faculte> {
    const token = this.cookie.get('token') ?? '';
    try {
      const response = await fetch(`http://localhost:5000/api/faculty/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        return Promise.reject(errorData);
      }
      const data = await response.json();
      
      return data as Faculte;
    } catch (error) {
      console.error('Erreur lors de la récupération de la faculté :', error);
      throw error;
    }
  }

  async updateFaculte(id: string, name: string): Promise<Faculte> {
    const faculte = {
      nom: name
    }

    console.log(`Mise à jour de la faculté avec ID: ${id}, nom: ${name}`);
    

    const token = this.cookie.get('token') ?? '';

    try {
      const response = await fetch(`http://localhost:5000/api/faculty/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(faculte)
      });
      const data = await response.json();

      if (!response.ok) {
        return Promise.reject(data);
      }

      return data as Faculte;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la faculté :', error);
      throw error;
    }
  }
}
