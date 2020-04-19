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
