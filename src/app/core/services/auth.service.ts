import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
    getEtudiantConnecte() {
    return {
      nom: 'Jean Kongo',
      promotion: 'L2 Informatique',
    };
  }
}
