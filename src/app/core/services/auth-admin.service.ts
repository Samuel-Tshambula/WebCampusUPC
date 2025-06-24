import { CookieService } from './cookie.service';
import { Teacher, TeacherItem, TeacherStudent } from './../models/teacher';
import { AuthAdmin } from './../models/auth-admin';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  private ADMIN_URL = 'http://localhost:5000/api/admin/'
  private PROF_URL = 'http://localhost:5000/api/student/professors/'
  cookie : CookieService = inject(CookieService)
  private apiUrl = 'http://localhost:5000/api/admin/statistique';

  constructor() { }

  async getStatistics(): Promise<any> {
    const token = this.cookie.get('token');
    if (!token) {
      throw new Error('Token non trouvé');
    }
    try {
      const response = await fetch(this.apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Assurez-vous d'envoyer le token dans l'en-tête Authorization
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des statistiques');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur dans DashboardService:', error);
      throw error;
    }
  }

  async loginAdmin(username: string, password: string): Promise<AuthAdmin> {

    const admin = {
      username: username,
      password: password
    }

    let rep = await fetch(this.ADMIN_URL+'login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin)
    }).then(res => res.json())

    return rep;
  }

  async registerTeacher(data: Teacher): Promise<{ message: string }> {
    let token = this.cookie.get('token')
    const response = await fetch(this.ADMIN_URL+'teachers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Erreur lors de l’inscription');
    }

    return await response.json();
  }

  async getAllTeachers(): Promise<TeacherItem[]> {
    let token = this.cookie.get('token')
    const res = await fetch(this.ADMIN_URL+'teachers',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error("Erreur lors du chargement des professeurs");
    return await res.json();
  }

  async getAllTeachersStudent(): Promise<TeacherStudent[]> {
    let token = this.cookie.get('token')
    const res = await fetch(this.PROF_URL,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error("Erreur lors du chargement des professeurs");
    return await res.json();
  }

  async deleteTeacher(id: string): Promise<void> {
    let token = this.cookie.get('token')
    const res = await fetch(`${this.ADMIN_URL+'teachers'}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur de suppression');
    }
  }

  async getTeacherById(id: string): Promise<TeacherItem> {
  let token = this.cookie.get('token');
  const res = await fetch(`${this.ADMIN_URL}teachers/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erreur chargement professeur');
  }
  return await res.json();
}

// Mettre à jour un professeur
async updateTeacher(id: string, data: Partial<Teacher>): Promise<void> {
  let token = this.cookie.get('token');
  const res = await fetch(`${this.ADMIN_URL}teachers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erreur lors de la mise à jour');
  }
}

  
}
