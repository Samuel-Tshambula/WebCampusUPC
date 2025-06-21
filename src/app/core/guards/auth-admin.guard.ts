import { CookieService } from './../services/cookie.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authAdminGuard: CanActivateFn = (route, state) => {
  const cookies : CookieService = inject(CookieService)
  const router : Router = inject(Router)

  const token = cookies.get('token')
  const role = cookies.get('role')

  if(token  && role === 'admin') {
    return true;
  }

  router.navigate(['adm/lgad'])
  return false
};
