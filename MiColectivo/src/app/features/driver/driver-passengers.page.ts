// import { Component } from '@angular/core';
// import { DriverService } from '../../core/services/driver.service';

// @Component({
//   selector: 'app-driver-passengers',
//   templateUrl: './driver-passengers.page.html',
//   styleUrls: ['./driver-passengers.page.scss'],
// })
// export class DriverPassengersPage {
//   passengerCount: number = 0;

//   constructor(private driverService: DriverService) {}

//   // Sumar un pasajero
//   increment() {
//     this.passengerCount++;
//     this.driverService.updatePassengerCount(this.passengerCount).subscribe();
//   }

//   // Restar un pasajero
//   decrement() {
//     if (this.passengerCount > 0) {
//       this.passengerCount--;
//       this.driverService.updatePassengerCount(this.passengerCount).subscribe();
//     }
//   }
// }
