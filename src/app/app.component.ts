import { NgIf } from '@angular/common';
import { FooterComponent } from './shared/footer/footer.component';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showHeader: boolean = true;
  showFooter: boolean = true;

  constructor( private route : Router) {
    this.route.events.subscribe(() => {
      const hiddenRoutes = ['admin', 'adm'];
      this.showHeader = !hiddenRoutes.some(route => this.route.url.includes(route));
    })

    this.route.events.subscribe(() => {
      const hiddenFooterRoutes = ['login', 'valveetudiants/dashboard', 'enseignant/dashboard', 'admin', 'adm'];
      this.showFooter = !hiddenFooterRoutes.some(routes => this.route.url.includes(routes));
    })
  }
}
