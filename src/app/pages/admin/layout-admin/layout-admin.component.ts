import { CookieService } from './../../../core/services/cookie.service';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-layout-admin',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css'
})
export class LayoutAdminComponent {
  cookies : CookieService = inject(CookieService)
  router : Router = inject(Router)
  deconnexion(){
    this.cookies.delete('token')
    this.cookies.delete('role')
    this.router.navigate(['/'])
  }
}
