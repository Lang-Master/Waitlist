// Load environment variables
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json()); 
app.use(cors()); 

// --- ROUTES ---

// POST /api/waitlist/signup: Adds a new user
app.post('/api/waitlist/signup', async (req, res) => {
    const { email } = req.body;

    // Basic validation that email is provided
    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        const newUser = await prisma.waitlistEntry.create({
            data: { email }
        });

        // Simplified success response
        res.status(201).json({ 
            message: 'Successfully joined the waitlist!',
            email: newUser.email,
            timestamp: newUser.timestamp 
        });
        
    } catch (error) {
        // MySQL/Prisma error code for unique constraint violation (duplicate email)
        if (error.code === 'P2002') { 
            return res.status(409).json({ error: 'This email is already on the waitlist.' });
        }
        console.error('Signup Error:', error);
        res.status(500).json({ error: 'Could not process sign-up due to a server error.' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});