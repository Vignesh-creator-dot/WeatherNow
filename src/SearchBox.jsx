
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "./SearchBox.css";

export default function SearchBox({ setWeatherInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL =
    "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "75a9b3ae22f4347a3917a038bceef65d";

  // Common function for city and current-location weather
  const fetchWeather = async (url) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "City not found. Please check the name."
            : data.message || "Unable to fetch weather."
        );
      }

      const result = {
        city: data.name,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        feelsLike: data.main.feels_like,
        weather: data.weather[0].description,
        main: data.weather[0].main,
        icon: data.weather[0].icon,
      };

      setWeatherInfo(result);
      return true;
    } catch (err) {
      setError(err.message || "Something went wrong.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Existing city-search functionality
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading || !city.trim()) return;

    const success = await fetchWeather(
      `${API_URL}?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&units=metric`
    );

    if (success) setCity("");
  };

  // New current-location functionality
  const getCurrentLocation = () => {
    if (loading) return;

    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        await fetchWeather(
          `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
      },
      (err) => {
        setLoading(false);

        if (err.code === 1) {
          setError("Location permission denied. Please allow location access.");
        } else if (err.code === 2) {
          setError("Your location is unavailable. Try again.");
        } else {
          setError("Location request timed out. Please try again.");
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  return (
    <div className="SearchBox">
      <h3>Search for the weather</h3>

      <form onSubmit={handleSubmit}>
        <TextField
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
            setError("");
          }}
          disabled={loading}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Search"
          )}
        </Button>
      </form>

      <div className="location-button">
        <Button
          variant="outlined"
          onClick={getCurrentLocation}
          disabled={loading}
        >
          📍 Use My Location
        </Button>
      </div>

      {loading && (
        <p className="loading-message">
          Fetching weather data...
        </p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
}
