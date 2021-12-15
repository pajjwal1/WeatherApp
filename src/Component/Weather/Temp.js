import React , {useEffect, useState} from 'react'
import "./style.css"

const Temp = () => {
    const [searchValue, setSearchValue] = useState("Allahabad");
    const [tempInfo, setTempInfo] = useState({});
    const [weatherState, setWeatherState] = useState("");
    useEffect(()=>{
        getWeatherInfo();

        
    },[]);
    useEffect(()=>{
        if(tempInfo.weatherMood){
            switch(tempInfo.weatherMood){
                case "Clouds" :
                    setWeatherState("wi-day-cloudy");
                    break;
                case "Haze" :
                    setWeatherState("wi-fog");
                    break;
                case "Clear" :
                    setWeatherState("wi-day-sunny");
                    break;
                case "Partially cloudy" :
                    setWeatherState("wi-day-partlycloudy");
                    break;
                case "Rain" :
                    setWeatherState("wi-rain");
                    break;
                case "Mist" :
                    setWeatherState("wi-windy");
                    break;
                default: setWeatherState("wi-day-sunny");
                    break;
            }
        }
    },[tempInfo.weatherMood]);
    const getWeatherInfo = async()=>{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=be70edd2991155442bc5518da3da3f06`;
            const res = await fetch(url);
            const data = await res.json();
            const {temp,humidity,pressure} = data.main;
            const{main:weatherMood} = data.weather[0];
            const{name: cityName} =data;
            const{sunset, country} = data.sys;
            const{speed} = data.wind;

            const myWeatherInfo = {
                temp,
                humidity,
                pressure,
                weatherMood,
                cityName,
                sunset,
                country,
                speed,
            }
            setTempInfo(myWeatherInfo);
        } catch(error){
            console.log(error);
        }
    }
    let sec = tempInfo.sunset;
    let date = new Date(sec*1000);
    let timeStr = `${date.getHours()}:${date.getMinutes()}`
    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder="search..." autoFocus id="search" className="searchTerm"
                     onChange={(e)=>{setSearchValue(e.target.value)}} />
                    <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>
                </div>
            </div>
            <article className="widget">
                <div className="weatherIcon">
                    <i className={`wi ${weatherState}`}></i>
                </div>
                <div className="weatherInfo">
                    <div className="temperature">
                        <span>{tempInfo.temp}&deg;C</span>
                    </div>
                    <div className="description">
                        <div className="weatherCondition">{tempInfo.weatherMood}</div>
                        <div className="place"> {tempInfo.cityName},{tempInfo.country}</div>
                    </div>
                </div>
                <div className="date">{new Date().toLocaleString()}</div>
                <div className="extra-temp">
                    <div className="temp-info-minmax">
                        <div className="two-sided-section">
                            <p><i className={"wi wi-sunset"}></i></p>
                            <p className="extra-info-leftside">{timeStr}<br /> Sunset </p>
                        </div>
                        <div className="two-sided-section">
                            <p><i className={"wi wi-humidity"}></i></p>
                            <p className="extra-info-leftside">{tempInfo.humidity} <br /> Humidity </p>
                        </div>
                    </div>
                    <div className="weather-extra-info">
                        <div className="two-sided-section">
                            <p><i className={"wi wi-rain"}></i></p>
                            <p className="extra-info-leftside">{tempInfo.pressure} <br /> Pressure </p>
                        </div>
                        <div className="two-sided-section">
                            <p><i className={"wi wi-strong-wind"}></i></p>
                            <p className="extra-info-leftside">{tempInfo.speed} <br /> Speed </p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}

export default Temp
