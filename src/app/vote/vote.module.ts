import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotePageRoutingModule } from './vote-routing.module';

import { VotePage } from './vote.page';

import { NgApexchartsModule } from 'ng-apexcharts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VotePageRoutingModule,  
    NgApexchartsModule,
  ],
  declarations: [VotePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VotePageModule {}
