const express = require("express");
const path = require("path");
const cors = require("cors");
const apiRoutes = require("./routes/scrape");
const dotenv = require("dotenv");
const { connectToDb, getDb } = require("./config/db");
const { ObjectId } = require("mongodb");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
//db connection
let db;
connectToDb(error => {
  if (!error) {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    db = getDb();
  }
});
console.log("db", db);

// Middleware to parse JSON bodies
app.use(express.json());

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

// get all search history
app.get("/", async (req, res) => {
  const data = req.body
  const response = await db.collection("search").find({}).toArray();
  res.json({ message: response });
});


app.get("/history/:user", async (req, res) => {
  // get search history for user
  const data = req.body
  const userId = req.params.user
  const response = await db.collection("search").find({userId}).toArray();
  res.json({ message: response });
});

// store scraped data
app.post("/search", async (req, res) => {
  const newData = req.body.data;
  try {
    const result = await db.collection("search").insertOne(newData);
    res.status(201).json({id: result.insertedId}); // Return the newly created document
  } catch (err) {
    res.status(500).json({ error: "Failed to insert data" });
  }
});

// get product by id
app.get("/product/:id", async (req, res) => {
  console.log("req.params.id", req.params.id);
  const productId = req.params.id;
  // const response = await db.collection("search").find({ _id: productId }).toArray();
  const response = await db.collection("search").find({"_id" : new ObjectId(productId)}).toArray();
  // const print = response
  console.log(response)
  res.json({ message: response});
});


app.get("/api/products", (req, res) => {
  console.log("products are");
  console.log("req.body", req.body);
  res.json({ message: "projects are" });
});

// All other requests point to React's index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

app.use("/scrape", apiRoutes);
