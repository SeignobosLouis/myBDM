import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocketioPage } from './socketio.page';

const routes: Routes = [
  {
    path: '',
    component: SocketioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocketioPageRoutingModule {}
