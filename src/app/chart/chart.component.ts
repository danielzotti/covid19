import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'dz-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  data;

  @ViewChild("chart")
  private elementRef: ElementRef<HTMLCanvasElement>;

  chartEl

  chart: Chart;
  ctx: CanvasRenderingContext2D;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.data = this.data;
      this.chart.update();
    }

  }

  ngAfterViewInit() {
    this.chartEl = this.elementRef.nativeElement;

    if (this.chartEl) {

      this.ctx = this.chartEl.getContext('2d');

      this.chart = new Chart(this.ctx, {
        // The type of chart we want to create
        type: 'line',
        // Configuration options go here
        options: {}
      });
    }


  }

}
