import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DriverHomePage } from 'src/app/features/driver/home/home.page';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = 'http://localhost:3000/driver';

  constructor(private http: HttpClient) {}

  updatePassengerCount(count: number) {
    // Idealmente deberías tener el ID del chófer autenticado
    return this.http.post(`${this.apiUrl}/update-passenger-count`, {
      driverId: '123', // en producción, esto se saca del token
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

}
