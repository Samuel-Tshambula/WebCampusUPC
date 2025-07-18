import { inject } from '@angular/core';
import { CookieService } from './../services/cookie.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const cookies : CookieService = inject(CookieService)
  const router : Router = inject(Router)

  const token = cookies.get('token')
  const role = cookies.get('role')

  if(token  && role === 'student') {
    return true;
  }

  router.navigate(['auth/login'])
  return false
};
