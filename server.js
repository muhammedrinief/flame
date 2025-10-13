const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public")); // serve frontend files

// Current status
let currentStatus = "NONE";

// API endpoint to update status from Python/Arduino script
app.post("/update", (req, res) => {
  const event = req.body.event;
  if (["FLAME", "SMOKE", "NONE"].includes(event)) {
    currentStatus = event;
    console.log("Updated status:", event);
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

// API endpoint to get current status (frontend polling)
app.get("/status", (req, res) => {
  res.json({ status: currentStatus });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
