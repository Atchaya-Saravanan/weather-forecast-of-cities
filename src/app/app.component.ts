import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { WeatherData } from 'src/models/weather.model';
import { WeatherService } from 'src/services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private weatherService: WeatherService) {
    this.getWeatherDataByCity(this.cityName);
  }

  public cityName: string = 'Wellington';
  public lat: number = 0;
  public lon: number = 0;
  public errorMessage = '';
  weatherData?: WeatherData;
  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.cityName = '';
  }

  onSubmit() {
    this.getWeatherDataByCity(this.cityName);
    this.cityName = '';
  }

  setMapCoordinates(event: any) {
    this.lat = event.coords.lat;
    this.lon = event.coords.lon;
    this.getWeatherDataByCoordinates(this.lat, this.lon);
  }

  private getWeatherDataByCity(cityName: string) {
    this.subscriptions.add(this.weatherService.getWeatherDataByCity(cityName)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          this.lat = response.location.lat;
          this.lon = response.location.lon;
          this.errorMessage = '';
        },
        error: () => {
          this.weatherData = undefined;
          this.errorMessage = "Unable to fetch results. Please try again later."
        }
      }));
  }

  private getWeatherDataByCoordinates(lat: number, lon: number) {
    this.subscriptions.add(this.weatherService.getWeatherDataByCoordinates(lat, lon)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          this.errorMessage = ''
        },
        error: () => {
          this.weatherData = undefined;
          this.errorMessage = "Unable to fetch the co-ordinates. Please try searching using the city name."
        }
      }));
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}