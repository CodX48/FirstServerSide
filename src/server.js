import express, { json } from "express";
import mongoose from "mongoose";
import Form from "../utiles/registerDB.js"; 

mongoose
    .connect("mongodb://localhost:27017/mydatabase")
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
    });

const app = express();
app.use(json()); 

app.post("/register", async (req, res) => {
    const { FirstName, LastName, Gmail, Age } = req.body;

    if (!FirstName || !LastName || !Gmail || !Age) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newForm = new Form({
            FirstName,
            LastName,
            Gmail,
            Age,
        });

        await newForm.save();

        res.status(201).json({ message: "Registration successful"});
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/login", async (req,res)=>{

    const {Gmail} = req.body;

    if (!Gmail) {
        return res.status(400).json({ message: "Gmail is required" });
    }
    try{
        const User = await Form.findOne({Gmail});

        if(!User){
            res.status(404).send(false);
        }
        res.status(200).send(true)

    }catch (err) {
        console.error("Error finding user:", err);
        res.status(500).json({ message: "Internal server error" });
    }



})

app.listen(5000, () => {
    console.log("Server is running on port 3000");
});