```javascript
// Importing necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Creating the express app
const app = express();

// Setting up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Import routes from server.js
const serverRoutes = require('./server');
app.use('/', serverRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```
