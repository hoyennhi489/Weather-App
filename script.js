const apiKey = "56818a9a03a8527f64f2a191cf326976";

document.getElementById("searchBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=en`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found!");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("weatherInfo").classList.remove("hidden");

      let displayName = `${data.name}, ${data.sys.country}`;
      if (data.name === "Turan" && data.sys.country === "VN") {
        displayName = "Đà Nẵng, VN";
      }

      document.getElementById("cityName").textContent = displayName;
      document.getElementById("temp").textContent = `Temperature: ${data.main.temp}°C`;
      document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;

      // Weather icon
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`; // dùng @4x cho icon rõ hơn
      document.getElementById("weatherIcon").src = iconUrl;
      document.getElementById("weatherIcon").alt = data.weather[0].description;
    })
    .catch((error) => {
      alert(error.message);
    });
});