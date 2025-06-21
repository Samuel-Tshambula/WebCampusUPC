import { CookieService } from './../../../core/services/cookie.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login-etudiant',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-etudiant.component.html',
  styleUrl: './login-etudiant.component.css'
})
export class LoginEtudiantComponent {

  cookie : CookieService = inject(CookieService)
   loginForm = new FormGroup({
    cardNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  message: string | null = null;
  isError = false;

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    if (this.loginForm.invalid) return;

    
    const { cardNumber, password } = this.loginForm.getRawValue();
    if (!cardNumber || !password) {
      this.message = "Tous les champs sont requis.";
      this.isError = true;
      return;
    }

    try {
      const result = await this.authService.loginStudent({ cardNumber: cardNumber||'', password: password || '' });
      this.cookie.set('token', result.token);
      this.cookie.set('role', result);
      this.router.navigate(['/valve-etudiant']);
    } catch (err: any) {
      this.message = err.error?.message || 'Erreur de connexion';
      this.isError = true;
    }
  }

  closeAlert() {
    this.message = null;
    this.isError = false;
  }
}
