import express  from 'express';
import mongoose  from "mongoose";
import cors from "cors";
import EmployeeModel from "./server/models/Employee.js";

const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT ||  3000;
try{
    mongoose.connect("mongodb+srv://Mugarura:Kristen12$@streamline-analytics.ayhamee.mongodb.net/");
    console.log("Connected to the");

    app.get("/testing", (req, res) => {
        return res.status(200).json({message:"We are working!!"})
    })

    app.post("/login", (req, res) => {
        const { email, password } = req.body;
        EmployeeModel.findOne({ email: email })
            .then(user => {
                if (user) {
                    if (user.password === password) {
                        // Assuming user.role contains the role information
                        res.json({ status: "Success", role: user.role });
                    } else {
                        res.json("Password is incorrect");
                    }
                } else {
                    res.json("No record exists matching those credentials");
                }
            })
            .catch(err => console.log(err));
    });

    app.post("/forgot-password", (req, res) => {
        const { email } = req.body;

        // Check if the email exists in the database
        EmployeeModel.findOne({ email: email })
            .then(user => {
                if (user) {
                    // If the email exists, send a success response
                    res.json({ success: true, message: "Password reset email sent successfully." });
                } else {
                    // If the email does not exist, send a failure response
                    res.json({ success: false, message: "No user found with the provided email." });
                }
            })
            .catch(err => {
                console.error("Error:", err);
                res.status(500).json("An error occurred while processing your request.");
            });
    });


    app.post('/register', (req,res) => {
        EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
    })

    app.post("/reset-password", (req, res) => {
        const { email, newPassword, newConfirmPassword} = req.body;

        // Update the user's password in the database based on the email
        EmployeeModel.findOneAndUpdate(
            { email: email }, // Find the user based on the email
            { password: newPassword, confirmpassword: newConfirmPassword }, // Update the password
            // { confirmpassword: newPassword }, // Update the password
            { new: true } // Return the updated user object
        )
        .then(updatedUser => {
            if (updatedUser) {
                // Password reset successful
                res.json({ success: true, message: "Password reset successful." });
            } else {
                // User with the provided email not found
                res.json({ success: false, message: "No user found having the provided email." });
            }
        })
        .catch(err => {
            console.error("Error:", err);
            res.status(500).json("An error occurred while processing your request.");
        });
    });



    app.listen(port,() => {
        console.log(`Server is now running at http://localhost:${port}`)
    })
}catch(error){
    console.log("Error connecting to the database:",error)
}

