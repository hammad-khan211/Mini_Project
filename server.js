const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle form submission
app.post('/register', (req, res) => {
  const { name, email, age, phone, password, skillLevel } = req.body;
  const data = `${name},${email},${age},${phone},${password},${skillLevel}\n`;

  fs.appendFile('database.csv', data, (err) => {
    if (err) {
      return res.status(500).send('Error saving data');
    }

    res.send('<script>alert("User Registered Successfully"); window.location.href="/";</script>');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
