import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthAdmin } from './../../../core/models/auth-admin';
import { Router } from '@angular/router';
import { AuthAdminService } from './../../../core/services/auth-admin.service';
import { Component, inject } from '@angular/core';
import { CookieService } from './../../../core/services/cookie.service';

@Component({
  selector: 'app-login-admin',
  imports: [ ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  serviceAdmin: AuthAdminService = inject(AuthAdminService)
  router: Router = inject(Router)
  admin !: AuthAdmin
  cookie: CookieService = inject(CookieService)
  
  adminForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  })


  AuthAdmins(){
    this.serviceAdmin.loginAdmin(
      this.adminForm.value.username??"",
      this.adminForm.value.password??""
    ).then((data:AuthAdmin) => {
      this.admin = data

      if(data.token && data.role ==='admin'){
        this.cookie.set("token", data.token)
        this.cookie.set("role", data.role)
        this.router.navigate(['admin'])
      }
    })
  }

}
