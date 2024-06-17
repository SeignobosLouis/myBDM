import { Component, OnInit } from '@angular/core';
import { io, Socket } from "socket.io-client";

@Component({
  selector: 'app-socketio',
  templateUrl: './socketio.page.html',
  styleUrls: ['./socketio.page.scss'],
})
export class SocketioPage implements OnInit {
  private socket: Socket;

  constructor() {
    this.socket = io('http://84.235.235.229:3000');
  }

  ngOnInit() {
    this.socket.on('hi', (data) => {
      console.log(data);
    });

    this.socket.on('validUserAnswer', (data) => {
      console.log("valid user ", data);
    })

    this.socket.on('testAnswer', (data) => {
      console.log("testanswer", data);
    })

    this.socket.on('getSondagesAnswer', (data) => {
      console.log("getSondagesAnswer", data);
    })

    this.socket.on('getSondagesAnswer', (data) => {
      console.log(data);
    })

    this.socket.on('canCreateSondageAnswer', (data) => {
      console.log("canCreateSondageAnswer", data);
    })

    this.socket.on('noVotesAnswer', (data) => {
      console.log("noVotesAnswer", data);
    })
  }

  sendMessage() {
    this.socket.emit('createSondageAction', {
      id_user: 1,
      date_creation: new Date(),
      day_vote_time: 10,
      hour_vote_time: 0,
      title: "Mon Premier Sondage",
      description: "Voici mon premier sondage",
      associated_picture: new Blob(),
      background_color: "green",
    });

    //this.socket.emit('getSondagesAction');
  }
}
