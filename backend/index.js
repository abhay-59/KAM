const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
app.use(cors({
    origin: 'http://localhost:3000', // Frontend origin
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    // allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies or credentials if needed
}));

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// authentication


app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurants');
const contactRoutes = require('./routes/contacts');
const interactionRoutes = require('./routes/interactions');
const callRoutes = require('./routes/calls');
const performanceRoutes = require('./routes/performance');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/calls', callRoutes);
app.use('/api/performance', performanceRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT || 5000, '0.0.0.0', () =>{
    console.log(`Server running on port ${PORT}`);
});
