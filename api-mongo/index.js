const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/login");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("Connected to MongoDB");
});

// User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String }
});

const UserModel = mongoose.model('User', UserSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
// Routes
app.get('/', function(req, res){
    res.send("Welcome to User API");
});

// Register User Endpoint
app.post('/register', function(req, res){
    const { username, password } = req.body;
    console.log(req.body)
    const newUser = new UserModel({ username, password });

    newUser.save()
        .then(function(user) {
            console.log("User registered successfully:");
            res.status(201).json({ message: "User registered successfully" });
        })
        .catch(function(err) {
            console.error("Error registering user:", err);
            res.status(500).json({ error: "Error registering user" });
        });
});


// Get All Users Endpoint
app.get('/users', function(req, res){
    UserModel.find({})
        .then(function(users) {
            console.log("Users fetched successfully:");
            res.status(200).json({ users });
        })
        .catch(function(err) {
            console.error("Error fetching users:", err);
            res.status(500).json({ error: "Error fetching users" });
        });
});



// Get User by ID Endpoint
app.get('/users/:id', function(req, res){
    const userId = req.params.id;
    UserModel.findById(userId, function(err, user){
        if(err) {
            console.error("Error fetching user:", err);
            res.status(500).json({ error: "Error fetching user" });
        } else {
            console.log("User fetched successfully:", user);
            res.status(200).json({ user });
        }
    });
});

// Start Server
app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`);
});
