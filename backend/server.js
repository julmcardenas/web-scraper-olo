const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Handle API requests here
app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// All other requests point to React's index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
