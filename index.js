const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const items = ['Apple', 'Banana', 'Orange'];

// Get list of items
app.get('/items', (req, res) => {
    res.json(items);
});

// Handle POST request to '/submit'
app.post('/submit', (req, res) => {
    const data = req.body;
    res.send(`Received: ${JSON.stringify(data)}`);
});

// Add a new item to the list
app.post('/items', (req, res) => {
    const newItem = req.body.item;
    if (newItem) {
        items.push(newItem);
        res.json(items);
    } else {
        res.status(400).send('Item is required');
    }
});

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Define a route for the "About" page
app.get('/about', (req, res) => {
    res.send('About Us');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
