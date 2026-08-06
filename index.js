const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");

const app = express();
const PORT =  3000;
app.use(cors());
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/zomato", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define endpoint to fetch nearest restaurants
app.get("/restaurants/nearby", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    const restaurants = await mongoose.connection.db.collection("restaurants").find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lon), parseFloat(lat)],
          },
          $maxDistance: 10000, // 5 km radius
        },
      },
    }).toArray();

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
// Ensure location field is indexed for geospatial queries
app.get("/restaurants/images",async(req,res)=>{
  try{
    const{id}=req.query;
    const images=await mongoose.connection.db.collection("rest1").findOne({id:id},{ projection: { featured_image: 1, location: 1, _id: 0 } });console.log(images);
    res.json(images);
  }
  catch(err){
    console.log("ERROR FETCHING IMAGE",err);
  }
})
app.get("/restaurants", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = (page - 1) * limit;

    // Fetch total number of documents for pagination
    const total = await mongoose.connection.db.collection("restaurants").countDocuments();

    // Fetch only the required documents for the current page
    const results = await mongoose.connection.db
      .collection("restaurants")
      .find()
      .skip(startIndex)
      .limit(limit)
      .toArray();
      res.json({
        data: results,
        total: total,
      });  } catch (err) {
    console.log("ERROR FETCHING RESTS", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});async function createGeoIndex() {
  try {
    await mongoose.connection.db.collection("restaurants").createIndex({ location: "2dsphere" });
    console.log("Geospatial index created successfully");
  } catch (error) {
    console.error("Error creating geospatial index:", error);
  }
}

mongoose.connection.once("open", createGeoIndex);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});