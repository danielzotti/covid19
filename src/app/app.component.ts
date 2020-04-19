import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Cases, ChartItemApi } from "./app.models";
import { ChartData } from "chart.js";

@Component({
  selector: 'dz-root',
  template: `
    <h1>Total</h1>
    <dz-chart [data]="total"></dz-chart>

    <h1>Daily</h1>
    <dz-chart [data]="daily"></dz-chart>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  total: ChartData;

  daily: ChartData;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('https://api.covid19api.com/dayone/country/italy').subscribe(
      (res: Array<ChartItemApi>) => {
        this.total = this.buildTotal(res);
        this.daily = this.buildDaily(res);
      }
    )
  }

  buildData(res: Array<ChartItemApi>, fn: (res: Array<ChartItemApi>, key: Cases) => Array<number>) {
    return {
      labels: res.map(i => {
        const parts = i.Date.split('-')
        return `${parts[2].substring(0, 2)}/${parts[1]}`;
      }),
      datasets: [
        // {
        //   label: 'Active',
        //   data: fn(res, Cases.Active), // res.map(i => i.Active),
        //   backgroundColor: 'rgba(255, 99, 132, 0.1)',
        //   borderColor: 'rgb(255, 99, 132)',
        // },
        {
          label: 'Confirmed',
          data: fn(res, Cases.Confirmed), // res.map(i => i.Confirmed),
          backgroundColor: 'rgba(50, 50, 255, 0.1)',
          borderColor: 'rgb(50, 50, 255)',
        },
        {
          label: 'Deaths',
          data: fn(res, Cases.Deaths), // res.map(i => i.Deaths),
          backgroundColor: 'rgba(255, 50, 50, 0.1)',
          borderColor: 'rgb(255, 50, 50)',
        },
        {
          label: 'Recovered',
          data: fn(res, Cases.Recovered), // res.map(i => i.Recovered),
          backgroundColor: 'rgba(50, 255, 50, 0.1)',
          borderColor: 'rgb(50, 255, 50)',
        }

      ]
    }
  }

  buildTotal(res: Array<ChartItemApi>) {
    return this.buildData(res, this.mapTotalItem)
  }

  buildDaily(res: Array<ChartItemApi>) {
    return this.buildData(res, this.mapDailyItem)
  }

  mapTotalItem(res: Array<ChartItemApi>, key: Cases) {
    return res.map(i => i[key])
  }

  mapDailyItem(res: Array<ChartItemApi>, key: Cases) {
    return res.reduce((acc, item) => ([
      ...acc,
      (item[key] - acc.reduce((a, b) => a + b))
    ]), [0])
  }

}
