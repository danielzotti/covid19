import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ChartItemApi } from "./app.models";
import { ChartData } from "chart.js";

@Component({
  selector: 'dz-root',
  template: `
    <h1>Covid19 charts</h1>
    <dz-chart [data]="data"></dz-chart>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  data: ChartData

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('https://api.covid19api.com/dayone/country/italy').subscribe(
      (res: Array<ChartItemApi>) => {
        console.log(res)
        this.data = {
          labels: res.map(i => {
            const parts = i.Date.split('-')
            return `${parts[2].substring(0, 2)}/${parts[1]}`;
          }),
          datasets: [
            {
              label: 'Active',
              data: res.map(i => i.Active),
              // backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
            },
            {
              label: 'Confirmed',
              data: res.map(i => i.Confirmed),
              borderColor: 'rgb(0, 0, 255)',
            },
            {
              label: 'Deaths',
              data: res.map(i => i.Deaths),
              borderColor: 'rgb(255,0,0)',
            },
            {
              label: 'Recovered',
              data: res.map(i => i.Recovered),
              borderColor: 'rgb(0, 255,0)',
            }

          ]
        }
      }
    )
  }

}
