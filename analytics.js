```javascript
// Importing necessary libraries
const mysql = require('mysql');

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

// Function to get user analytics
function getUserAnalytics(userId) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT UserAnalytics FROM Analytics WHERE UserID = ${userId}`;
        db.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
}

// Function to update user analytics
function updateUserAnalytics(userId, analyticsData) {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE Analytics SET UserAnalytics = '${JSON.stringify(analyticsData)}' WHERE UserID = ${userId}`;
        db.query(sql, (err, result) => {
            if (err) reject(err);
            resolve({ status: 'success' });
        });
    });
}

// Export the functions
module.exports = {
    getUserAnalytics,
    updateUserAnalytics
};
```
