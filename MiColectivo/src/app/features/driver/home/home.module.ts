import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { DriverHomePageRoutingModule } from './home-routing.module';

import { DriverHomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverHomePageRoutingModule,
    HttpClientModule,

  ],
  declarations: [DriverHomePage]
})
export class DriverHomePageModule {}
