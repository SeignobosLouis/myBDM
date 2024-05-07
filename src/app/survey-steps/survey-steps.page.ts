import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Swiper } from 'swiper';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ColorEvent } from 'ngx-color';

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

  selectedImage: any;

  ionCardWidth: any;

  colorBackgroundPicked: string ="";

  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation()?.extras.state;
    this.surveyName = routerState?.['surveyNameInput']?.input.text;
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
