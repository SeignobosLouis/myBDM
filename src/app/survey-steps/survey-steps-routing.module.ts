import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyStepsPage } from './survey-steps.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyStepsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyStepsPageRoutingModule {}
