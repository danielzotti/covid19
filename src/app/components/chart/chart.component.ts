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
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          },
          plugins: {
            zoom: {
              // Container for pan options
              pan: {
                // Boolean to enable panning
                enabled: true,

                // Panning directions. Remove the appropriate direction to disable
                // Eg. 'y' would only allow panning in the y direction
                // A function that is called as the user is panning and returns the
                // available directions can also be used:
                //   mode: function({ chart }) {
                //     return 'xy';
                //   },
                mode: 'xy',

                rangeMin: {
                  // Format of min pan range depends on scale type
                  x: null,
                  y: null
                },
                rangeMax: {
                  // Format of max pan range depends on scale type
                  x: null,
                  y: null
                },

                // On category scale, factor of pan velocity
                speed: 20,

                // Minimal pan distance required before actually applying pan
                threshold: 10,

                // Function called while the user is panning
                onPan: function({chart}) { console.log(`I'm panning!!!`); },
                // Function called once panning is completed
                onPanComplete: function({chart}) { console.log(`I was panned!!!`); }
              },

              // Container for zoom options
              zoom: {
                // Boolean to enable zooming
                enabled: true,

                // Enable drag-to-zoom behavior
                drag: true,

                // Drag-to-zoom effect can be customized
                // drag: {
                // 	 borderColor: 'rgba(225,225,225,0.3)'
                // 	 borderWidth: 5,
                // 	 backgroundColor: 'rgb(225,225,225)',
                // 	 animationDuration: 0
                // },

                // Zooming directions. Remove the appropriate direction to disable
                // Eg. 'y' would only allow zooming in the y direction
                // A function that is called as the user is zooming and returns the
                // available directions can also be used:
                //   mode: function({ chart }) {
                //     return 'xy';
                //   },
                mode: 'xy',

                rangeMin: {
                  // Format of min zoom range depends on scale type
                  x: null,
                  y: null
                },
                rangeMax: {
                  // Format of max zoom range depends on scale type
                  x: null,
                  y: null
                },

                // Speed of zoom via mouse wheel
                // (percentage of zoom on a wheel event)
                speed: 0.1,

                // On category scale, minimal zoom level before actually applying zoom
                sensitivity: 3,

                // Function called while the user is zooming
                onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
                // Function called once zooming is completed
                onZoomComplete: function({chart}) { console.log(`I was zoomed!!!`); }
              }
            }
          }
        }
      });
    }


  }

}
