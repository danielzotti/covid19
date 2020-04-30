export interface ChartItemApi {
  "Country": string; // "Italy",
  "CountryCode": string; //  "IT",
  "Province": string; //  "",
  "City": string; //  "",
  "CityCode": string; //  "",
  "Lat": string; //  "41.87",
  "Lon": string; //  "12.57",
  "Confirmed": number; // 2,
  "Deaths": number; // 0,
  "Recovered": number; // 0,
  "Active": number; // 0,
  "Date": string; //  "2020-01-31T00:00:00Z"
}

export enum Cases {
  Confirmed = "Confirmed",
  Deaths = "Deaths",
  Recovered = "Recovered",
  Active = "Active",
}

export interface Country {
  Country: string,
  Slug: string,
  ISO2: string
}

export interface Region {
  data: string; // "2020-02-24T18:00:00",
  stato: string; // "ITA",
  codice_regione: number; // 13,
  denominazione_regione: string; // "Abruzzo",
  lat: number; // 42.35122196,
  long: number; // 13.39843823,
  ricoverati_con_sintomi: number; // 0,
  terapia_intensiva: number; // 0,
  totale_ospedalizzati: number; // 0,
  isolamento_domiciliare: number; // 0,
  totale_positivi: number; // 0,
  variazione_totale_positivi: number; // 0,
  nuovi_positivi: number; // 0,
  dimessi_guariti: number; // 0,
  deceduti: number; // 0,
  totale_casi: number; // 0,
  tamponi: number; // 5,
  casi_testati: number; // null,
  note_it: string; // "",
  note_en: string; // ""
}
