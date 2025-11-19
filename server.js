const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve nonveg images folder
app.use("/nonveg", express.static(path.join(__dirname, "nonveg")));

// API route for nonveg.json
app.get("/nonveg", (req, res) => {
  fs.readFile("nonveg.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read nonveg.json" });
    }
    res.json(JSON.parse(data));
  });
});

// PORT for Render deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Non-Veg API running on port ${PORT}`);
});
