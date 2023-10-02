import React, { useEffect, useState } from "react";

import Search from "./components/search/search";

import CurrentWeather from "./components/currentWeather/currentWeather";
import Forecast from "./components/forecast/forecast";
import Loading from "./components/Loading/loading";

type Location = {
  value: string;
  label: string | undefined;
};
function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const success = (position: any) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = {
        value: latitude + " " + longitude,
        label: undefined,
      };
      searchChangeHandler(location);
    };
    const error = (error: any) => {
      console.log(error);
    };
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(success, error);
    } else {
      return console.log("Geolocation not supported");
    }
  }, []);
  const searchChangeHandler = (enteredData: Location) => {
    console.log(enteredData);
    setIsLoading(true);
    const [latitude, longitude] = enteredData.value.split(" ");
    const weatherFetch = fetch(
      `
    https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=72fba2865844ff05049736d359c936b7&units=metric
    `
    );

    const forecastFetch = fetch(
      `
    https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=72fba2865844ff05049736d359c936b7&units=metric
    `
    );
    Promise.all([weatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const foreCastResponse = await response[1].json();
        setTodayWeather({ city: enteredData.label, ...weatherResponse });
        setTodayForecast({ city: enteredData.label, ...foreCastResponse });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container m-auto">
      {isLoading === false}
      <Search className="mt-3" onSearchChange={searchChangeHandler} />
      {isLoading && <Loading></Loading>}
      {!isLoading && todayWeather && (
        <CurrentWeather data={todayWeather}></CurrentWeather>
      )}
      {!isLoading && todayForecast && <Forecast data={todayForecast} />}
    </div>
  );
}

export default App;
