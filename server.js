```javascript
// Importing necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { spawn } = require('child_process');

// Creating the express app
const app = express();

// Setting up body-parser
app.use(bodyParser.json());

// Setting up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'PersonalizedLearningEcosystem'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Endpoint to get personalized content for a user
app.get('/user/:id/content', (req, res) => {
    let userId = req.params.id;
    let sql = `SELECT UserPreferences, UserPerformance, UserHistory FROM Users WHERE UserID = ${userId}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        let userData = result[0];

        // Call the Python script with the user data
        let python = spawn('python', ['algorithm.py', JSON.stringify(userData)]);
        python.stdout.on('data', (data) => {
            // Send the personalized content back to the client
            res.send(JSON.parse(data));
        });
    });
});

// Endpoint to update user interaction with content
app.post('/user/:id/interaction', (req, res) => {
    let userId = req.params.id;
    let interactionData = req.body;
    let sql = `INSERT INTO UserContentInteraction (UserID, ContentID, InteractionData) VALUES (${userId}, ${interactionData.contentId}, '${JSON.stringify(interactionData.data)}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send({ status: 'success' });
    });
});

// Endpoint to get analytics for a user
app.get('/user/:id/analytics', (req, res) => {
    let userId = req.params.id;
    let sql = `SELECT UserAnalytics FROM Analytics WHERE UserID = ${userId}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

// Endpoint to submit feedback
app.post('/user/:id/feedback', (req, res) => {
    let userId = req.params.id;
    let feedbackData = req.body;
    let sql = `INSERT INTO Feedback (UserID, FeedbackData) VALUES (${userId}, '${JSON.stringify(feedbackData)}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send({ status: 'success' });
    });
});

// Starting the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```
