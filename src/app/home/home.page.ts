import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io, Socket } from "socket.io-client";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  
  hasData: boolean = false;

  socket: Socket;
  
  sondagesList: any = null;
  constructor(private router: Router) {
    this.socket = io('http://84.235.235.229:3000');
  }

  ngOnInit(): void {
    this.socket.emit('getSondagesAction');
    this.socket.on('getSondagesAnswer', (data) => {
      this.sondagesList = data;
      console.log(data)
      if (this.sondagesList.length > 0) {
        this.hasData = true;
      };
    })
  }

  creationDateAdapter(date: string): Date {
    return new Date(date);
  }

  goToSurvey(){
    this.router.navigate(['/survey']);
  }

  goToVote(){
    this.router.navigate(['/vote']);
  }

}
