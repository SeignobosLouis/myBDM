import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { io, Socket } from "socket.io-client";
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild(IonModal) modal?: IonModal;


  hasData: boolean = false;

  socket: Socket;

  isUserConnected: boolean = false;

  userPseudo: string = "";

  userPassword: string = "";

  sondagesList: any = null;

  static userId?: number;

  constructor(private router: Router) {
    this.socket = io('http://84.235.235.229:3000');
  }

  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  connectUser() {
    this.modal?.dismiss({ pseudo: this.userPseudo, password: this.userPassword }, 'connect');
  }

  createUser() {
    this.modal?.dismiss({ pseudo: this.userPseudo, password: this.userPassword }, 'create');
  }

  onWillDismiss(event: Event) {
    const dismissEvent = event as CustomEvent;
    if (dismissEvent.detail.role === 'create') {
      this.socket.emit('createUserAction', dismissEvent.detail.data);
    }
    else if (dismissEvent.detail.role === 'connect') {
      this.socket.emit('checkValidUserAction', dismissEvent.detail.data);
    }
  }

  ngOnInit(): void {
    this.socket.emit('getSondagesAction');
    this.socket.on('getSondagesAnswer', (data) => {
      this.sondagesList = data;
      console.log(this.sondagesList);
      if (this.sondagesList.length > 0) {
        this.hasData = true;
      };
    });

    this.socket.on('createUserAnswer', (data) => {
      if (data) {
        alert("Utilisateur créé avec succès");
        window.location.reload();
      }
      else alert("Erreur lors de la création de l'utilisateur, le pseudo est peut être déjà utilisé");
    });

    this.socket.on('validUserAnswer', (data) => {
      if (data.isValidLogin) {
        this.isUserConnected = true;
        alert("Utilisateur connecté avec succès");
      }
      else alert("Utilisateur non existant ou mauvais pseudo/mot de passe");
    });
  }

  creationDateAdapter(date: string): Date {
    return new Date(date);
  }

  goToSurvey() {
    this.router.navigate(['/survey']);
  }

  goToVote(sondage_id: number) {
    console.log(sondage_id);
    this.router.navigate(['/vote']);
  }

}
