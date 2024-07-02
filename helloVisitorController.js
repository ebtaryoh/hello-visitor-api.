const axios = require("axios");
require("dotenv").config();

const getHelloVisitor = async (req, res, next) => {
  try {
    const visitorName = req.query.visitor_name || "Guest";
    const clientIP = req.ip;
    const location = await getLocation(clientIP);
    const temperature = await getTemperature(location.city);
    const greeting = `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${location.city}`;

    res.json({
      client_ip: clientIP,
      location: location.city,
      greeting: greeting,
    });
  } catch (error) {
    next(error);
  }
};

async function getLocation(ip) {
  return { city:"New York" };
}

async function getTemperature(city) {
  const apiKey = process.env.apiKey;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.main.temp;
  } catch (error) {
    console.error("Error fetching temperature:", error);
    return "unknown";
  }
}

module.exports = {
  getHelloVisitor,
};
