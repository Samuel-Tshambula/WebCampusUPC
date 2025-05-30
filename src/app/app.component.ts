import { FooterComponent } from './shared/footer/footer.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
