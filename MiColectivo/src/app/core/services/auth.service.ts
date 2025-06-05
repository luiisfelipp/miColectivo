// Servicio para manejar la autenticación

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Para hacer peticiones HTTP
import { Observable, tap } from 'rxjs'; // Para manejar respuestas asincrónicas

@Injectable({
  providedIn: 'root' // Esto hace que el servicio sea accesible en toda la app
})
export class AuthService {
  private apiUrl = 'https://api.micolectivo.com/auth'; // La URL del backend (API REST) que maneja la autenticación

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.role); // Guarda el rol que entrega el backend
      })
    );
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