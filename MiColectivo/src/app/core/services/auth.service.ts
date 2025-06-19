// Servicio para manejar la autenticación

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Para hacer peticiones HTTP
import { Observable, tap } from 'rxjs'; // Para manejar respuestas asincrónicas
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio sea accesible en toda la app
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(credentials: { nombre: string; password: string }): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.role); // Guarda el rol que entrega el backend
      })
    );
  }

  
  // Método para registrar un nuevo usuario
  register(credentials: { nombre: string; email: string, telefono: string, password: string; role: string }) {
  return this.http.post<any>(`${environment.apiUrl}/auth/register`, credentials);
}

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Obtener el rol del usuario autenticado
  getRole(): string | null {
    return localStorage.getItem('user_role');
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
  }

  
}