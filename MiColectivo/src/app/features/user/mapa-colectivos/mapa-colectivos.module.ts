import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicModule } from '@ionic/angular';

import { MapaColectivosPageRoutingModule } from './mapa-colectivos-routing.module';

import { MapaColectivosPage } from './mapa-colectivos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    MapaColectivosPageRoutingModule
  ],
  declarations: [MapaColectivosPage]
})
export class MapaColectivosPageModule {}
