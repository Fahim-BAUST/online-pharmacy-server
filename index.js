const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3001;

// Middleware to handle CORS
app.use(cors());

// MongoDB connection URI from environment variables
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@medicines.srxzb.mongodb.net/?retryWrites=true&w=majority&appName=medicine`;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  await client.connect();
  const database = client.db("pharmacy");
  const medicineCollection = database.collection("medicines");

  // API route to fetch table data
  app.get("/api/table-data", async (req, res) => {
    try {
      // const { securityCode } = req.body;

      // Validate security code
      // if (securityCode !== `${process.env.accessToken}`) {
      //   return res
      //     .status(403)
      //     .json({ error: "Forbidden: Invalid security code" });
      // }

      const tableData = medicineCollection.find({});
      const result = await tableData.toArray();

      // Send empty array if no data is found
      res.status(200).json(result.length > 0 ? result : []);
    } catch (error) {
      console.error("Error fetching table data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
}
run().catch(console.dir);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
