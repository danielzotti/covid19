import { Component, OnInit } from '@angular/core';
import { ChartData, ChartDataSets } from "chart.js";
import { HttpClient } from "@angular/common/http";
import { Cases, ChartItemApi, Country, Region } from "./dashboard.models";

@Component({
  selector: 'dz-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private readonly apiBaseUrl = "https://api.covid19api.com";
  private readonly countriesUrl = `${this.apiBaseUrl}/countries`;
  private readonly dayOneByCountryUrl = `${this.apiBaseUrl}/dayone/country`;

  // private readonly apiRegionBaseUrl = "https://github.com/pcm-dpc/COVID-19/raw/master/dati-json/dpc-covid19-ita-regioni-latest.json"
  // private readonly apiRegionBaseUrl = "https://covid19-aggiornamenti.it/api/chart?chart=1&regione=Lombardia,Emilia-Romagna,Veneto,Friuli%20Venezia%20Giulia,Abruzzo,Basilicata,Calabria,Campania,Lazio,Marche,Liguria,Molise,Valle%20d%27Aosta,Umbria,Toscana,Sicilia,Sardegna,Puglia,Piemonte"
  private readonly apiRegionBaseUrl = `assets/regions.json`;

  countries: Array<Country>;
  selectedCountry: Country;
  regions: Array<Region>;

  total: ChartData;
  daily: ChartData;
  regionTotal: ChartData;
  regionDaily: ChartData;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    this.getCountries();
    this.getRegions();
    this.selectCountry({Slug: 'italy', Country: 'Italy', ISO2: 'it'});
  }

  getCountries() {
    this.http.get(`${this.countriesUrl}`).subscribe(
      (res: Array<Country>) => {
        this.countries = res.sort((a, b) => a.Slug.localeCompare(b.Slug));
      }
    )
  }

  getRegions() {
    // this.regions = regionApiData;
    // this.regionTotal = this.buildRegionTotal(this.regions);
    // this.regionDaily = this.buildRegionDaily(this.regionTotal);
    this.http.get(`${this.apiRegionBaseUrl}`).subscribe(
      (res: Array<Region>) => {
        this.regions = res;
        this.regionTotal = this.buildRegionTotal(this.regions);
        this.regionDaily = this.buildRegionDaily(this.regionTotal);
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

  buildRegionTotal(res: Array<Region>) {
    const labels = [...new Set(res.map(i => {
      const parts = i.data.split('-')
      return `${parts[2].substring(0, 2)}/${parts[1]}`;
    }))];

    return {
      labels: labels,
      datasets: res.reduce((acc, item) => {
        const regionIndex = acc.findIndex(i => i.label === item.denominazione_regione);

        if (regionIndex !== -1 && acc[regionIndex]) {
          return [
            ...acc.map((i, index) => {
              if (index === regionIndex) {
                return {
                  ...acc[index],
                  data: [...acc[index].data, item.deceduti]
                }
              } else {
                return acc[index]
              }
            })]
        } else {
          return [
            ...acc,
            {
              label: item.denominazione_regione,
              borderColor: this.getRandomColor(),
              data: [item.deceduti]
            }]
        }
      }, [])
    }
  }

  buildRegionDaily(res: ChartData) {
    return {
      ...res,
      datasets: res.datasets.map((d: ChartDataSets) => ({
        ...d,
        data: (d.data as Array<number>).reduce((acc: Array<number>, item: number) => ([
          ...acc,
          (item - acc.reduce((a, b) => a + b))
        ]), [0])
      }))
    }
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

  getRandomColor(opacity = 1) {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${opacity})`
  }

}


