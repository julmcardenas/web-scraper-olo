const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json())

// Enable CORS
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: "GET,POST", // Allow specific HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow specific headers
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Handle API requests here
app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});
app.get("/api/products", (req, res) => {
  res.json({ message: "projects are" });
});

// All other requests point to React's index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

const apiRoutes = require("./routes/scrape");
app.use("/scrape", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
