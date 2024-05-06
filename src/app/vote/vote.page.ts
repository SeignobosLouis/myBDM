import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Motion } from '@capacitor/motion';
import {
  ChartComponent,
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

  public chartOptions: ChartOptions;

  constructor(private cdr: ChangeDetectorRef) {
    this.chartOptions = {
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
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      dataLabels: {
        formatter: this.dataLabelsFormatter.bind(this),
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
      }
    };
  }

  cursorX: number | undefined;
  cursorY: number | undefined;
  private sampleSize = 10;
  private cursorXValues: number[] = [];
  private cursorYValues: number[] = [];
  private readonly viewBoxMaxRadius: number = 250;

  private calculateCursorXSmooth(newValue: number): number {
    this.cursorXValues.push(newValue);
    if (this.cursorXValues.length > this.sampleSize) {
      this.cursorXValues.shift();
    }
  
    // Si le tableau ne contient pas assez d'éléments, retourner la dernière valeur
    if (this.cursorXValues.length < this.sampleSize) {
      return this.cursorXValues[this.cursorXValues.length - 1];
    }
  
    return this.cursorXValues.reduce((a, b) => a + b, 0) / this.cursorXValues.length;
  }
  
  private calculateCursorYSmooth(newValue: number): number {
    this.cursorYValues.push(newValue);
    if (this.cursorYValues.length > this.sampleSize) {
      this.cursorYValues.shift();
    }
  
    // Si le tableau ne contient pas assez d'éléments, retourner la dernière valeur
    if (this.cursorYValues.length < this.sampleSize) {
      return this.cursorYValues[this.cursorYValues.length - 1];
    }
  
    return this.cursorYValues.reduce((a, b) => a + b, 0) / this.cursorYValues.length;
  }
  
  
  weekDaysName: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  weekDaysCount: number = 0;

  dataLabelsFormatter(): string {
    return this.weekDaysName[this.weekDaysCount++ % 7];
  }

  ionViewWillEnter() {
    Motion.addListener('accel', (data: any) => {
      this.cursorX = this.calculateCursorXSmooth(this.viewBoxMaxRadius * Math.cos(Math.atan(data.accelerationIncludingGravity.x / data.accelerationIncludingGravity.z) + (Math.PI/2)));
      this.cursorY = this.calculateCursorYSmooth(this.viewBoxMaxRadius * Math.sin(Math.atan(data.accelerationIncludingGravity.x / data.accelerationIncludingGravity.z) + (Math.PI/2)));
      this.cdr.detectChanges();
    });
  }

  ionViewWillLeave() {
    Motion.removeAllListeners();
  }
}
