import { LightningElement, track ,api} from 'lwc';
import getWeather from '@salesforce/apex/WeatherReportController.getWeather';

export default class WeatherReport extends LightningElement {
    @track location;
    @api currentWeather = false;
    @track description;
    @track currentTemperature;
    @track humidity;
    @track speed;

    handleLocationChange(event) {
        this.location = event.target.value;
    }

    handleGetWeather() {
        console.log(this.location);
        if (this.location) {
          getWeather({location: this.location})
            .then(response => {
              const weatherData = JSON.parse(response);
              console.log(weatherData);
              this.description = weatherData.weather[0].description;
              this.humidity = weatherData.main.humidity;             
              const temp = weatherData.main.temp;
              this.speed = weatherData.wind.speed;
              this.currentTemperature = ((temp - 32) * 5/9).toFixed(2);
              this.city = weatherData.name;
              this.currentWeather = true;
            })
            .catch(error => {
              console.error('Error fetching weather data: ' + error);
              this.currentWeather = false;
              this.forecast = null;
            });
        }
    }
}