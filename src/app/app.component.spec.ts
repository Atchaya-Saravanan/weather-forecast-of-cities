import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { WeatherData } from 'src/models/weather.model';
import { WeatherService } from 'src/services/weather.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let weatherService: jasmine.SpyObj<WeatherService>;
  let weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeatherDataByCity', 'getWeatherDataByCoordinates']);

  let weatherData: WeatherData = {
    location: {
      name: "London",
      region: "City of London, Greater London",
      country: "United Kingdom",
      lat: 51.52,
      lon: -0.11,
      tz_id: "Europe/London",
      localtime_epoch: 1663137098,
      localtime: "2022-09-14 7:31"
    },
    current: {
      last_updated_epoch: 1663136100,
      last_updated: "2022-09-14 07:15",
      temp_c: 14,
      temp_f: 57.2,
      is_day: 1,
      condition: {
        text: "Light rain",
        icon: "weather.png",
        code: 1183
      },
      wind_mph: 3.8,
      wind_kph: 6.1,
      wind_degree: 20,
      wind_dir: "NNE",
      pressure_mb: 1006,
      pressure_in: 29.71,
      precip_mm: 2.9,
      precip_in: 0.11,
      humidity: 100,
      cloud: 75,
      feelslike_c: 14,
      feelslike_f: 57.1,
      vis_km: 10,
      vis_miles: 6,
      uv: 1,
      gust_mph: 5.8,
      gust_kph: 9.4
    }
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    weatherService = TestBed.get(WeatherService);
    fixture.detectChanges();
  });
});
