import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'survey',
    loadChildren: () => import('./survey/survey.module').then (m => m.SurveyPageModule)
  },
  {
    path: 'survey-steps',
    loadChildren: () => import('./survey-steps/survey-steps.module').then( m => m.SurveyStepsPageModule)
  },
  {
    path: 'vote',
    loadChildren: () => import('./vote/vote.module').then( m => m.VotePageModule)
  },
  {
    path: 'socketio',
    loadChildren: () => import('./socketio/socketio.module').then( m => m.SocketioPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
