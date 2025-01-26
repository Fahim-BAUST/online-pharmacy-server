import express, { Request, Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware to handle CORS
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// MongoDB connection URI from environment variables
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@medicines.srxzb.mongodb.net/?retryWrites=true&w=majority&appName=medicine`;

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const database = client.db("pharmacy");
    const medicineCollection = database.collection("medicines");

    // API route to fetch table data
    app.get("/api/table-data", async (req: Request, res: Response) => {
      try {
        const tableData = medicineCollection.find({});
        const result = await tableData.toArray();

        // Send empty array if no data is found
        res.status(200).json(result.length > 0 ? result : []);
      } catch (error) {
        console.error("Error fetching table data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/", (req: Request, res: Response) => {
      res.send("Welcome to the API!");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
run().catch(console.dir);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
