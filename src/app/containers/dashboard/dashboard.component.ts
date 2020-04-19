import { Component, OnInit } from '@angular/core';
import { ChartData } from "chart.js";
import { HttpClient } from "@angular/common/http";
import { Cases, ChartItemApi, Country } from "./dashboard.models";

@Component({
  selector: 'dz-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private readonly apiBaseUrl = "https://api.covid19api.com";
  private readonly countriesUrl = `${this.apiBaseUrl}/countries`;
  private readonly dayOneByCountryUrl = `${this.apiBaseUrl}/dayone/country`;

  countries: Array<Country>;
  selectedCountry: Country;
  total: ChartData;
  daily: ChartData;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    this.getCountries();
    this.selectCountry({Slug: 'italy', Country: 'Italy', ISO2: 'it'});
  }

  getCountries() {
    this.http.get(`${this.countriesUrl}`).subscribe(
      (res: Array<Country>) => {
        this.countries = res.sort((a, b) => a.Slug.localeCompare(b.Slug));
      }
    )
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;

    this.http.get(`${this.dayOneByCountryUrl}/${country.Slug}`).subscribe(
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
          backgroundColor: 'rgba(51, 153, 255, 0.1)',
          borderColor: 'rgb(51, 153, 255)',
        },
        {
          label: 'Deaths',
          data: fn(res, Cases.Deaths), // res.map(i => i.Deaths),
          backgroundColor: 'rgba(255, 80, 80, 0.1)',
          borderColor: 'rgb(255, 80, 80)',
        },
        {
          label: 'Recovered',
          data: fn(res, Cases.Recovered), // res.map(i => i.Recovered),
          backgroundColor: 'rgba(80, 255, 80, 0.1)',
          borderColor: 'rgb(80, 255, 80)',
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
