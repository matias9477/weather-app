import React, {Component} from 'react';
import Location from './Location';
import WeatherData from './WeatherData';
import convert from 'convert-units';
import './styles.css';
import {
    CLOUD,
    CLOUDY,
    SUN,
    RAIN,
    SNOW,
    WINDY,
} from './../../constants/weathers';

const location = "Buenos Aires,ar";
const api_key = "a05ce5942f2fa1fcee2ecc135dd44bb3";
const url_base_weather = "http://api.openweathermap.org/data/2.5/weather";
const api_weather = `${url_base_weather}?q=${location}&appid=${api_key}`;


const data = {
    temperature: 69,
    weatherState: SUN,
    humidity: 10,
    wind: '10 m/s',
}



class WeatherLocation extends Component{

    constructor() {
        super();
        this.state = {
            city: "Barcelona",
            data: data,
        };
    }

    getTemp = kelvin =>{
        return Number(convert(kelvin).from("K").to("C").toFixed(2));
    }

    getWeatherState = weather_data =>{
        return SUN;
    }
    getData = weather_data => {
        const{ humidity, temp} = weather_data.main;
        const{ speed } = weather_data.wind;
        const weatherState = this.getWeatherState(weather_data);
        const temperature = this.getTemp(temp);
        
        const data = {
            humidity,
            temperature,
            weatherState,
            wind: `${speed} m/s`,
        }
        return data;
    }

    handleUpdateClick = () =>{
        fetch(api_weather).then( resolve =>{
            return resolve.json();
        }).then(data => {
            const newWeather = this.getData(data);
            console.log(newWeather);
            this.setState({
                data: newWeather

            })
            
        });
    }


    render(){
        const { city,data } = this.state;
        return(
            <div className="weatherLocationCont">
            <Location city={city} />
            <WeatherData data={data} />
            <button onClick={this.handleUpdateClick}>Actualizar</button>
             </div>
        );
    }
   

}

export default WeatherLocation;