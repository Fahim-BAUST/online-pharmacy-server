"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3001;
// Middleware to handle CORS
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // To parse JSON request bodies
// MongoDB connection URI from environment variables
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@medicines.srxzb.mongodb.net/?retryWrites=true&w=majority&appName=medicine`;
const client = new mongodb_1.MongoClient(MONGO_URI, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
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
        app.get("/api/table-data", async (req, res) => {
            try {
                const tableData = medicineCollection.find({});
                const result = await tableData.toArray();
                // Send empty array if no data is found
                res.status(200).json(result.length > 0 ? result : []);
            }
            catch (error) {
                console.error("Error fetching table data:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        app.get("/", (req, res) => {
            res.send("Welcome to the API!");
        });
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
    }
}
run().catch(console.dir);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
