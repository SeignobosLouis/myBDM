import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Swiper } from 'swiper';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ColorEvent } from 'ngx-color';
import { io, Socket } from "socket.io-client";


@Component({
  selector: 'app-survey-steps',
  templateUrl: './survey-steps.page.html',
  styleUrls: ['./survey-steps.page.scss'],
})
export class SurveyStepsPage implements OnInit {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  @ViewChild('colorPickerInput') colorPickerInputRef: ElementRef | undefined;
  @ViewChild('.color-picker-container') colorPickerContainerRef: ElementRef | undefined;
  @ViewChild('.color-picker-circle') colorPickerCircleRef: ElementRef | undefined;
  @ViewChild('final-step-card') ionCardFinalStepRef: ElementRef | undefined;

  swiper?: Swiper;

  surveyName: string = "";

  surveyDescription: string = "";

  selectedImage: any;

  selectedDelayDay: string = "";

  selectedDelayHour: string = "";

  ionCardWidth: any;

  colorBackgroundPicked: string ="";

  socket: Socket;

  constructor(private router: Router, private renderer: Renderer2) {
    this.socket = io('http://84.235.235.229:3000');
   }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation()?.extras.state;
    this.surveyName = routerState?.['surveyNameInput']?.input.surveyName;
    this.surveyDescription = routerState?.['surveyDescriptionInput']?.input.surveyDescription;
    this.socket.on('canCreateSondageAnswer', (data) => {
      if (data) alert ("Sondage créé avec succès");
      else alert ("Sondage non crée car un autre est en cours");
    })
  }

  ionViewDidEnter() {
    this.swiperReady();
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext() {
    this.swiper?.slideNext();
  }

  goPrev() {
    this.swiper?.slidePrev();
  }

  swiperSlideChanged($event: any) { }

  updateCardBackground($event: ColorEvent) {
    this.colorBackgroundPicked = $event.color.hex;
  }

  createSondage() {
    this.socket.emit('createSondageAction', {
      id_user: 1,
      date_creation: new Date(),
      day_vote_time: parseInt(this.selectedDelayDay),
      hour_vote_time: parseInt(this.selectedDelayHour),
      title: this.surveyName,
      description: this.surveyDescription,
      associated_picture: this.selectedImage,
      background_color: this.colorBackgroundPicked,
    });
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    this.selectedImage = image.webPath;
  }
}
