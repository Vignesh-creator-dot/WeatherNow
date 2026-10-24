
import "./WeatherSuggestion.css";

export default function WeatherSuggestion({ info }) {
  const condition = (info.main || "").toLowerCase();
  const temp = info.temp;

  let icon = "🌤️";
  let title = "Enjoy your day!";
  let message = "Check the weather before heading out.";

  if (condition === "thunderstorm") {
    icon = "⛈️";
    title = "Storm Alert";
    message =
      "Stay indoors if possible and avoid exposed areas during thunderstorms.";
  } else if (
    condition === "rain" ||
    condition === "drizzle"
  ) {
    icon = "🌧️";
    title = "Carry an Umbrella";
    message =
      "Rain is expected according to the current weather condition. Consider carrying an umbrella.";
  } else if (condition === "snow") {
    icon = "❄️";
    title = "Keep Yourself Warm";
    message =
      "Wear warm clothes and take care while travelling in snowy conditions.";
  } else if (temp >= 35) {
    icon = "🥤";
    title = "It's Hot Outside";
    message =
      "Drink plenty of water, wear light clothes, and limit prolonged exposure to the sun.";
  } else if (condition === "clear" && temp >= 25) {
    icon = "☀️";
    title = "Sunny Weather";
    message =
      "Consider sunglasses and sunscreen if you'll be outdoors for a while.";
  } else if (condition === "clouds") {
    icon = "☁️";
    title = "Cloudy Skies";
    message =
      "It's a good idea to check the sky before planning outdoor activities.";
  } else if (
    condition === "mist" ||
    condition === "fog" ||
    condition === "haze"
  ) {
    icon = "🌫️";
    title = "Reduced Visibility";
    message =
      "Travel carefully and allow extra distance when driving.";
  } else if (temp < 10) {
    icon = "🧥";
    title = "Cold Weather";
    message =
      "Wear warm layers before heading outside.";
  } else {
    icon = "🌤️";
    title = "Have a Great Day!";
    message =
      "Weather looks moderate. Stay comfortable and enjoy your day.";
  }

  return (
    <div className="WeatherSuggestion">
      <div className="suggestion-icon">{icon}</div>

      <div className="suggestion-content">
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}
