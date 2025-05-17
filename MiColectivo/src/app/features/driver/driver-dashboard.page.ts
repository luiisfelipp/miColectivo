// import { Component, OnInit } from '@angular/core';
// import { TripService } from '../../core/services/trip.service'; // Servicio para manejar viajes
// import { AuthService } from '../../core/services/auth.service'; // Servicio de autenticación

// @Component({
//   selector: 'app-driver-dashboard',
//   templateUrl: './driver-dashboard.page.html',
//   styleUrls: ['./driver-dashboard.page.scss'],
// })
// export class DriverDashboardPage implements OnInit {

//   trips: any[] = []; // Lista de viajes para el chófer

//   constructor(private tripService: TripService, private authService: AuthService) {}

//   ngOnInit() {
//     // Verifica si el chófer está autenticado
//     if (!this.authService.isAuthenticated()) {
//       this.authService.logout(); // Si no está autenticado, cierra sesión
//     }
//     this.loadTrips(); // Carga los viajes asignados al chófer
//   }

//   // Método para cargar los viajes del chófer desde la API
//   loadTrips(): void {
//     this.tripService.getTripsForDriver('driver_id').subscribe((data) => {
//       this.trips = data; // Asigna los viajes a la lista de trips
//     });
//   }
// }
