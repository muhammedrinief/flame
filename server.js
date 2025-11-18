const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public")); // serve dashboard.html

// Store all sensor values
let sensorData = {
  flame: 0,
  gas_digital: 0,
  gas_analog: 0,
  pir: 0,
  water_digital: 0,
  water_analog: 0
};

// ------------------------------
// POST /update  (Python → Server)
// ------------------------------
app.post("/update", (req, res) => {
  const data = req.body;

  const required = [
    "flame",
    "gas_digital",
    "gas_analog",
    "pir",
    "water_digital",
    "water_analog"
  ];

  // Validate all keys exist
  for (let key of required) {
    if (!(key in data)) {
      return res.status(400).json({ error: `Missing key: ${key}` });
    }
  }

  sensorData = data; // Update latest sensor values
  console.log("Updated sensor data:", sensorData);

  res.json({ success: true });
});

// ------------------------------
// GET /status  (Frontend → Server)
// ------------------------------
app.get("/status", (req, res) => {
  res.json(sensorData);
});

// ------------------------------
const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
