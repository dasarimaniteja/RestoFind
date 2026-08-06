const express=require("express");
const mongoose=require("mongoose");
const app=express();
mongoose.connect("mongodb://localhost:27017/zomato", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected",async()=>{
    console.log("connection established");
    updateRestaurantsWithImages();
})
// const shift = async () => {
//     try {
//         const db = mongoose.connection.db;

//         // Fetch all documents from file1
//         const file1 = await db.collection("file1").find().toArray();

//         if (file1.length > 0) {
//             // Extract only restaurant objects and flatten the array
//             const restaurantsData = file1.flatMap((item) => 
//                 item.restaurants?.map((rest) => rest.restaurant) || []
//             );

//             if (restaurantsData.length > 0) {
//                 // Insert into file2 only if there are valid restaurant objects
//                 await db.collection("rest1").insertMany(restaurantsData);
//                 console.log("Data successfully inserted into file2.");
//             } else {
//                 console.log("No valid restaurant data found to insert.");
//             }
//         } else {
//             console.log("file1 is empty, nothing to insert.");
//         }
//     } catch (err) {
//         console.error("Error:", err);
//     }
// };
const updateRestaurantsWithImages = async () => {
    const updateRestaurantsWithImages = async () => {
        try {
            const db = mongoose.connection.db;
    
            // Fetch all restaurants from 'rest1' with their IDs and featured images
            const rest1Data = await db.collection("rest1").find({}, { projection: { id: 1, featured_image: 1 } }).toArray();
    
            for (const rest of rest1Data) {
                await db.collection("restaurants").updateOne(
                    { id: rest.id }, // Match by restaurant ID
                    { $set: { featured_image: rest.featured_image } } // Set featured_image field
                );
            }
    
            console.log("✅ Featured images updated in restaurants collection!");
        } catch (error) {
            console.error("❌ Error updating featured images:", error);
        }
    };
    
    // Call the function
    };

