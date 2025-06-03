import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DriverHomePage } from '../../features/driver/home/home.page';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = 'http://localhost:3000/driver';

  constructor(private http: HttpClient) {}

  updatePassengerCount(count: number) {
    // Se debería tener el ID de chofer autenticado
    return this.http.post(`${this.apiUrl}/update-passenger-count`, {
      driverId: '123', // en producción, esto se saca del token, por mientras lo dejamos así
      count: count
    });
  }
  updateLocation(driverId: string, latitude: number, longitude: number) {
    return this.http.post(`${this.apiUrl}/update-location`, {
      driverId,
      latitude,
      longitude
    });
  }

  // Este método ya se conecta al backend para obtener todas las ubicaciones
  getAllDriverLocations() {
    return this.http.get<any[]>('http://localhost:3000/driver/locations');
  }

  // Este método obtiene la ubicación del chofer por su ID, para que central vea los reportes
  sendAlert(driverId: string, type: string) {
  return this.http.post(`${this.apiUrl}/send-alert`, {
    driverId,
    type,
    timestamp: new Date().toISOString()
  });
}


}
