import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocketioPageRoutingModule } from './socketio-routing.module';

import { SocketioPage } from './socketio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocketioPageRoutingModule
  ],
  declarations: [SocketioPage]
})
export class SocketioPageModule {}
