import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private document = inject(DOCUMENT);

  set(name: string, value: string, days = 7): void {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    this.document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  get(name: string): string | null {
    return this.document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1] || null;
  }

  delete(name: string): void {
    this.set(name, '', -1);
  }
}
