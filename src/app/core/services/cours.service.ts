import { CourseResponse, Course, CourseItem } from './../models/cours';
import { CookieService } from './cookie.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private URL = 'http://localhost:5000/api/course';
  private Prof_URL = 'http://localhost:5000/api/teacher';

  constructor(private cookie: CookieService) {}

  async addCourse(course: Course): Promise<CourseResponse> {
    const token = this.cookie.get('token');
    const res = await fetch(this.URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur lors de l’ajout du cours');
    }

    return await res.json();
  }

  async getAllCourses(): Promise<CourseItem[]> {
    const token = this.cookie.get('token');
    const res = await fetch(this.URL,{
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Erreur de chargement des cours');
    return await res.json();
  }

  async deleteCourse(id: string): Promise<{ message: string }> {
    const token = this.cookie.get('token');
    const res = await fetch(`${this.URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur suppression');
    }
    return await res.json();
  }

  async getCourseById(id: string): Promise<CourseItem> {
    const token = this.cookie.get('token');
    const res = await fetch(`${this.URL}/${id}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error('Erreur lors du chargement du cours');
    return await res.json();
  }

  async getCoursEnseignes(id: string): Promise<any> {
    const token = this.cookie.get('token');
    const res = await fetch(this.Prof_URL+`/${id}/courses`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur lors de la récupération des cours enseignés');
    }
    return await res.json();
  }

  async updateCourse(id: string, data: any): Promise<{ message: string }> {
    const token = this.cookie.get('token');
    const res = await fetch(`${this.URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Erreur lors de la mise à jour');
    }

    return await res.json();
  }
}
