import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherApiBaseUrl: string = 'https://weatherapi-com.p.rapidapi.com/current.json';
  hostHeaderName: string = 'X-RapidAPI-Host';
  hostHeaderValue: string = 'weatherapi-com.p.rapidapi.com';
  keyHeaderName: string = 'X-RapidAPI-Key';
  keyHeaderValue: string = 'c90f5cccb0msh4068182fa1656d3p14ac4fjsnd3e6b0e08f91';

  constructor(private http: HttpClient) { }

  getWeatherDataByCity(cityName: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(this.weatherApiBaseUrl, {
      headers: new HttpHeaders()
        .set(this.hostHeaderName, this.hostHeaderValue)
        .set(this.keyHeaderName, this.keyHeaderValue),
      params: new HttpParams()
        .set('q', cityName)
    })
  }

  getWeatherDataByCoordinates(lat: number, lon: number): Observable<WeatherData> {
    let latlon = [lat, lon];
    let latlonParams = new HttpParams();
    latlonParams = latlonParams.append('q', latlon.join(',  '));
    return this.http.get<WeatherData>(this.weatherApiBaseUrl, {
      headers: new HttpHeaders()
        .set(this.hostHeaderName, this.hostHeaderValue)
        .set(this.keyHeaderName, this.keyHeaderValue),
      params: latlonParams
    })
  }
}