import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage {

  surveyName: string = "";

  constructor(private alertCtrl: AlertController, private router: Router) { }

  navigateWithState(data: string) {
    console.log(data)
    const navigationsExtras: NavigationExtras = {
      state: {
        surveyNameInput: {
          input: data,
        },
        surveyDescriptionInput: {
          input: data,
        },
      },
    };
    this.router.navigateByUrl('/survey-steps', navigationsExtras);
  }

  async presentPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Créer un sondage',
      inputs: [
        {
          name: 'surveyName',
          type: 'text',
          placeholder: 'Entrez le nom du sondage ici'
        },
        {
          name: 'surveyDescription',
          type: 'text',
          placeholder: 'Entrez sa description ici'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/home']);
          }
        },
        {
          text: 'Valider',
          handler: (data) => {
            this.navigateWithState(data);
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewDidEnter() {
    this.presentPrompt();
  }
}
