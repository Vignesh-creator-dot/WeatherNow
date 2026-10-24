
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";


export default function InfoBox({ info }) {
  const description = info.weather
    .split(" ")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  return (
    <div className="InfoBox">
      <Card
        sx={{
          maxWidth: 450,
          margin: "20px auto",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* One common weather image */}
        <CardMedia
          component="img"
          height="220"
          image="https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=800&utm_source=chatgpt.com"
          alt="Weather sky"
          sx={{ objectFit: "cover" }}
        />

        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
          >
            {info.city}
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>
            Temperature: {Math.round(info.temp)}°C
          </Typography>

          <Typography sx={{ mb: 1 }}>
            Feels Like: {Math.round(info.feelsLike)}°C
          </Typography>

          <Typography sx={{ mb: 1 }}>
            Humidity: {info.humidity}%
          </Typography>

          <Typography sx={{ mb: 1 }}>
            Min Temp: {Math.round(info.tempMin)}°C
          </Typography>

          <Typography sx={{ mb: 1 }}>
            Max Temp: {Math.round(info.tempMax)}°C
          </Typography>

          <Typography sx={{ mt: 2 }}>
            The weather can be described as{" "}
            <b>{description}</b>.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
