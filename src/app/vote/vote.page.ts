import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Motion } from '@capacitor/motion';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexPlotOptions,
  ApexGrid,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexTooltip,
} from "ng-apexcharts";

import { Swiper } from 'swiper';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  legend: ApexLegend;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-vote',
  templateUrl: './vote.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./vote.page.scss'],
})
export class VotePage {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  public daysChartOptions: ChartOptions;
  public hoursChartOptions: ChartOptions;
  public cursorX: number | undefined;
  public cursorY: number | undefined;
  private cursorXValues: number[] = [];
  private cursorYValues: number[] = [];
  private cursorArray: number[] = [];
  private daysCount: number = 0;
  private hoursCount: number = 0;
  private readonly tiltAngleCorrection: number = 1.92;
   phoneTiltAngle: number = 0;
  private sampleSize: number = 10;
   viewBoxMaxRadius: number = 50;
  private readonly daysName: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  private readonly hoursName: string[] = ["17h", "18h", "19h", "20h", "21h", "22h", "23h", "24h"];
  cos: number | undefined;
  sin: number | undefined;
  swiper?: Swiper;
  updateNumber(event: any) {
    this.viewBoxMaxRadius = parseInt(event.target.value, 10);
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.daysChartOptions = {
      series: [1, 1, 1, 1, 1, 1, 1],
      chart: {
        width: '100%',
        type: "donut"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%'
            },
          }
        }
      ],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
          donut: {
            labels: {
              show: true,
              value: {
                show: false,
              },
              total: {
                show: false,
              },
              name: {
                show: true,
                color: 'blue', 
                formatter: (data: string) =>
                  this.donutFieldsNameFormatter(data, 'week'),
              }
            },
          }
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      dataLabels: {
        formatter: this.dataLabelsFormatter.bind(this, 'week'),
      },
      fill: {
        type: 'image',
        image: {
          src: ['../../assets/images/drive_baby.jpg'],
        }
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    };

    this.hoursChartOptions = JSON.parse(JSON.stringify(Object.assign({}, this.daysChartOptions)));
    this.hoursChartOptions.series.push(1);
    this.hoursChartOptions.dataLabels.formatter = this.dataLabelsFormatter.bind(this, 'hour');
    this.hoursChartOptions.plotOptions.pie!.donut!.labels!.name!.formatter = (data: string) => this.donutFieldsNameFormatter(data, 'hour');
  }

  ionViewWillEnter() {
    Motion.addListener('accel', (data: any) => {
      this.phoneTiltAngle = (1.25 * (Math.atan(data.accelerationIncludingGravity.x / data.accelerationIncludingGravity.z) + (Math.PI / 2)));

      this.cos = Math.cos(this.phoneTiltAngle);
      this.sin = Math.sin(this.phoneTiltAngle);
      this.cursorX = this.calculateCursorSmooth(this.viewBoxMaxRadius * Math.cos(this.phoneTiltAngle), 'X');
      this.cursorY = this.calculateCursorSmooth(this.viewBoxMaxRadius * Math.sin(this.phoneTiltAngle), 'Y');
      this.cdr.detectChanges();
    });
  }

  ionViewDidEnter() {
    this.swiperReady();
  }

  ionViewWillLeave() {
    Motion.removeAllListeners();
  }

  private calculateCursorSmooth(newValue: number, whichCoordinate: string): number {
    switch (whichCoordinate) {
      case 'X':
        this.cursorArray = this.cursorXValues;
        break;
      case 'Y':
        this.cursorArray = this.cursorYValues;
        break;
    }

    this.cursorArray.push(newValue);
    if (this.cursorArray.length > this.sampleSize) {
      this.cursorArray.shift();
    }

    if (this.cursorArray.length < this.sampleSize) {
      return this.cursorArray[this.cursorArray.length - 1];
    }

    return this.cursorArray.reduce((a, b) => a + b, 0) / this.cursorArray.length;
  }


  dataLabelsFormatter(weekOrHour: string): string {
    if (weekOrHour == 'week') return this.daysName[this.daysCount++ % 7];
    if (weekOrHour == 'hour') return this.hoursName[this.hoursCount++ % 8];
    return '';
  }

  donutFieldsNameFormatter(fieldName: string, weekOrHour: string): string {
    const lastChar = parseFloat(fieldName[fieldName.length - 1]);
    if (weekOrHour == 'week') return this.daysName[lastChar - 1];
    if (weekOrHour == 'hour') return this.hoursName[lastChar - 1];
    return '';
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
}
