import React, { useState } from 'react';
import './App.css';

function App() {
  const handle = (e) => {
    setquery(e.target.value);
    // console.log(query);
  };

  const [query, setquery] = useState('');
  const [weather, setweather] = useState({});

  const search = (e) => {
    e.preventDefault();

    fetch(
      ` https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=48b3a7affff5fb9b2e6e0c2d6d7a1cc1`
    )
      .then((response) => response.json())
      .then((data) => {
        setweather(data);

        setquery('');
        console.log(data);
      });
  };

  const dataBuilder = (a) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'Juny',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let day = days[a.getDay()];
    let date = a.getDate();
    let month = months[a.getMonth()];
    let year = a.getFullYear();
    return (
      <div className="salom">
        <p>
          {day} {date} {month} {year}
        </p>
      </div>
    );
  };

  return (
    <div
      className={
       (typeof weather.main !=="undefined" )? ((Math.round(weather.main.temp - 273.15) >16)?"app" :"cold"):"cold"
      }
    >
      <div className="inputdiv">
        <form onSubmit={search}>
          <input
            value={query}
            onChange={(e) => handle(e)}
            // onKeyPress={search}
            className="input"
            placeholder="enter location"
          ></input>
        </form>

        {typeof weather.main !== 'undefined' ? (
          <div className="location_box">
            <div className="location">
              {weather.name} ,{weather.sys.country}
            </div>
            <div className="date"> {dataBuilder(new Date())}</div>

            <div className="temp">
              {' '}
              {Math.round(weather.main.temp - 273.15)} °C
            </div>
            <div className="sunny">{weather.weather[0].main}</div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default App;
