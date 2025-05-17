// Servicio para manejar la autenticación

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Para manejar respuestas asincrónicas

@Injectable({
  providedIn: 'root' // Esto hace que el servicio sea accesible en toda la app
})
export class AuthService {
  private apiUrl = 'https://api.micolectivo.com/auth'; // La URL del backend (API REST) que maneja la autenticación

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(credentials: { username: string, password: string }): Observable<any> {
    // Llama al backend para autenticar al usuario
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    // Verifica si el token JWT está guardado en el localStorage
    return !!localStorage.getItem('auth_token');
  }

  // Método para cerrar sesión
  logout(): void {
    // Elimina el token JWT al cerrar sesión
    localStorage.removeItem('auth_token');
  }
}
