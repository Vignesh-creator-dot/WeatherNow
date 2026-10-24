import { useState } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import WeatherSuggestion from "./WeatherSuggestion";
import "./App.css";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  return (
    <div className="WeatherApp">
      <h1 className="app-title">🌤️ WeatherNow</h1>

      <p className="app-tagline">
        Your daily weather, at a glance.
      </p>

      <SearchBox setWeatherInfo={setWeatherInfo} />

      {weatherInfo && <InfoBox info={weatherInfo} />}

      {weatherInfo && <WeatherSuggestion info={weatherInfo} />}
    </div>
  );
}