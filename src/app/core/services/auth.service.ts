import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private role: 'etudiant' | 'enseignant' | 'admin' | null = null;

  constructor() {
    // Simulation : définis ici le rôle à tester
    this.role = 'enseignant'; // Change 'etudiant' en 'enseignant' ou 'admin' pour tester
  }

  getEtudiantConnecte() {
    return {
      nom: 'Jean Kongo',
      promotion: 'L2 Informatique',
    };
  }
  
  // Cette méthode est utilisée pour définir le rôle de l'utilisateur, et la méthode getRole() pour récupérer le rôle actuel.
  setRole(role: 'etudiant' | 'enseignant' | 'admin') {
    this.role = role;
  }

  // Cette méthode retourne le rôle de l'utilisateur connecté, ou null si aucun rôle n'est défini.
  getRole(): string | null {
    return this.role;
  }

  isEtudiant(): boolean {
    return this.role === 'etudiant';
  }

  isEnseignant(): boolean {
    return this.role === 'enseignant';
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  logout() {
    this.role = null;
  }

  getCoursEnseignes(): string[] {
  // Simuler les cours enseignés par l'enseignant connecté
  return ['Maths', 'Physique'];
}
}
