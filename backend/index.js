import express from "express";
import db from "./config/database.js";
import restaurantRoutes from "./routes/index.js";
import cors from "cors";
 
const app = express();
 
try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}
 
app.use(cors());
app.use(express.json());
app.use('/restaurants', restaurantRoutes);

// Give error if someone tries to access a non-existent URL path
app.use('*', (req, res) => {
    res.status(404).json({error: "not found"})
})
 
app.listen(5000, () => console.log('Server running at port 5000'));