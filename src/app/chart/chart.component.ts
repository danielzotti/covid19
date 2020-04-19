import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'dz-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input()
  data;

  chart: Chart;
  ctx: CanvasRenderingContext2D;

  constructor() {
  }

  ngOnInit(): void {
    this.ctx = (<HTMLCanvasElement>document.getElementById('covid-chart')).getContext('2d');
    this.chart = new Chart(this.ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: this.data,
      // data: {
      //   labels: this.labels, //['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      //   datasets: [{
      //     label: 'Covid-19',
      //     backgroundColor: 'rgb(255, 99, 132)',
      //     borderColor: 'rgb(255, 99, 132)',
      //     data: this.data //: [0, 10, 5, 2, 20, 30, 45]
      //   }]
      // },

      // Configuration options go here
      options: {}
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.data = this.data;
      this.chart.update();
    }

  }

}
