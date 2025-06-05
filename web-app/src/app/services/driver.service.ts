import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // esto lo hace accesible globalmente
})
export class DriverService {

  private baseUrl = 'http://localhost:3000/driver'; // o tu dominio/backend real

  constructor(private http: HttpClient) {}

  // Método para obtener historial de visibilidad
  obtenerHistorialVisibilidad(filtros?: { accion?: string, fechaDesde?: string, fechaHasta?: string }) {
  // devuelve un Observable con los datos filtrados según parámetros, por ejemplo
  return this.http.get<any[]>(`/api/historial-visibilidad`, { params: filtros });
}

}
