import { NgIf, CommonModule } from '@angular/common';
import { AuthService } from './../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService: AuthService = inject(AuthService);
  role$!: Observable<string>;

  ngOnInit() {
    this.role$ = this.authService.role$;
  }

  logout() {
    this.authService.logout();
    // location.reload(); // ou utilise le router pour forcer un rechargement si nécessaire
  }
}
