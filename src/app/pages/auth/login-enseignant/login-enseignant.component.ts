import { CommonModule } from '@angular/common';
import { AuthService } from './../../../core/services/auth.service';
import { CookieService } from './../../../core/services/cookie.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthAdminService } from './../../../core/services/auth-admin.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login-enseignant',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-enseignant.component.html',
  styleUrl: './login-enseignant.component.css'
})
export class LoginEnseignantComponent {
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  enseignantService: AuthService = inject(AuthService);
  cookie : CookieService = inject(CookieService);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  message: string = '';
  isError: boolean = false;

  async onSubmit() {
    if (this.loginForm.invalid) return;

    try {
      const { email, password } = this.loginForm.value;
      const response = await this.enseignantService.login({ email, password });

      this.message = response.message || 'Connexion réussie';
      this.isError = false;

      this.cookie.set('token', response.token);
      this.cookie.set('role', response.role);
      this.cookie.set('id', response.teacher.id);
      this.enseignantService.setRole('teacher');

      this.router.navigate(['/enseignant']);
    } catch (error: any) {
      this.message = error.message || 'Erreur lors de la connexion.';
      this.isError = true;
    }
  }

  closeAlert() {
    this.message = '';
  }

}
