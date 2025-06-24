import { Router } from '@angular/router';
import { StudentItem } from './../models/student';
import { CookieService } from './cookie.service';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private roleSubject = new BehaviorSubject<'student' | 'teacher' | ''>('');
  cookie: CookieService= inject(CookieService)
  role$ = this.roleSubject.asObservable(); // observable pour la navbar
  private API_URL = 'http://localhost:5000/api/student';
  private baseUrl = 'http://localhost:5000/api/teacher';
  private statURL = 'http://localhost:5000/api/stats';
  router : Router = inject(Router);

   constructor() {
    const storedRole = this.cookie.get('role') as 'student' | 'teacher';
    if (storedRole === 'student' || storedRole === 'teacher') {
      this.roleSubject.next(storedRole);
    }
  }

  async getEtudiantConnecte(): Promise<StudentItem> {
    const token = this.cookie.get('token');

    if (!token) {
      throw new Error('Token non trouvé. Étudiant non authentifié.');
    }

    const res = await fetch(this.API_URL+'/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur lors de la récupération de l’étudiant.');
    }

    return await res.json();
  }
  
  setRole(role: 'student' | 'teacher'| '') {
    this.roleSubject.next(role);
    this.cookie.set('role', role);
  }

  getRole(): string {
    return this.roleSubject.value;
  }

  isEtudiant(): boolean {
    return this.getRole() === 'student';
  }

  isEnseignant(): boolean {
    return this.getRole() === 'teacher';
  }


  logout() {
    this.setRole('');
    this.cookie.delete('role');
    this.cookie.delete('token');
    this.cookie.delete('name');
    this.cookie.delete('Id');
    this.cookie.delete('promotionId');
    this.router.navigate(['/']);
  }

  async getEnseignantConnecte(): Promise<any>{
    const token = this.cookie.get('token');
    if (!token) {
      throw new Error('Token non trouvé. Enseignant non authentifié.');
    }
    const response = await fetch(`${this.baseUrl}/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Erreur lors de la récupération de l’enseignant.');
    }
    return await response.json()
  }


   async loginStudent(data: { cardNumber: string; password: string }): Promise<any> {
    const response = await fetch(this.API_URL+'/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur de connexion');
    }

    return await response.json();
  }

  async login(credentials: { email: string; password: string }): Promise<any> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Erreur lors de la connexion');
    }

    return response.json();
  }

  async getProfil(): Promise<any> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this.baseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Erreur lors de la récupération du profil');
    }

    return response.json();
  }

  async getStats(): Promise<any> {
    const res = await fetch(this.statURL);
    if (!res.ok) throw new Error('Erreur lors de la récupération des statistiques');
    return res.json();
  }

  async getDashboard(teacherId: string): Promise<any> {
    const response = await fetch(`http://localhost:5000/api/teacher/${teacherId}/dashboard`);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du tableau de bord enseignant.');
    }
    return await response.json();
  }
}
