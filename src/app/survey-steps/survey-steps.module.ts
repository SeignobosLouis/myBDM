import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyStepsPageRoutingModule } from './survey-steps-routing.module';

import { SurveyStepsPage } from './survey-steps.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ColorCircleModule } from 'ngx-color/circle';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyStepsPageRoutingModule,
    ColorCircleModule,
  ],
  declarations: [SurveyStepsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SurveyStepsPageModule {}
