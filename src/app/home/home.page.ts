import { Component } from '@angular/core';
import { LaunchService } from '../services/launch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private launchService: LaunchService, private router: Router) {}

  hasData: boolean = false;

  ionViewWillEnter() {
    this.launchService.getSondages().subscribe({
      next: (sondages) => {
        this.hasData = sondages;
      },
      //error: (error) => {
      //  alert('La connection via l\'API s\'est mal passe');
      //}
    });
  }

  goToSurvey(){
    this.router.navigate(['/socketio']);
  }

  goToVote(){
    this.router.navigate(['/vote']);
  }

}
