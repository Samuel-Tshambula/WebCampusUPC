import { Student, StudentItem } from './../models/student';
import { CookieService } from './cookie.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private URL = 'http://localhost:5000/api/admin/students';

  constructor(private cookie: CookieService) {}


  async getStudentsByPromotion(promotionId: string): Promise<StudentItem[]> {
    const token = this.cookie.get('token');
    const res = await fetch(`${this.URL}/promotion/${promotionId}`,{
      headers: {'Authorization': `Bearer ${token}`}
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur lors de la récupération des étudiants');
    }
    return await res.json();
  }

  async registerStudent(data: {
    fullName: string,
    cardNumber: string,
    email: string,
    password: string,
    promotion: string
  }): Promise<{ message: string }> {
    const token = this.cookie.get('token');

    const response = await fetch(this.URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Échec de l’inscription');
    }

    return await response.json();
  }

  async getAllStudents(): Promise<Student[]> {
    const token = this.cookie.get('token');
    const res = await fetch(this.URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur lors du chargement');
    }

    return await res.json();
  }

  async deleteStudent(id: string): Promise<{ message: string }> {
  const token = this.cookie.get('token');

  const response = await fetch(`${this.URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Erreur lors de la suppression');
  }

  return await response.json();
}

async getStudentById(id: string): Promise<StudentItem> {
  const token = this.cookie.get('token');
  const res = await fetch(`${this.URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Erreur');
  return res.json();
}

async updateStudent(id: string, data: { fullName: string; cardNumber: string; email: string; promotion: string }): Promise<{ message: string }> {
  const token = this.cookie.get('token');
  const res = await fetch(`${this.URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Erreur mise à jour');
  return res.json();
}

}
