// Guardia para proteger las rutas que requieren autenticación

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // Método para proteger las rutas
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Si el usuario no está autenticado, redirige a la página de login
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth']); // Redirige al login
      return false;
    }
    return true;
  }
}
