const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static__dirname);

app.get('/', (res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/products', async (req, res) => {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=10');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});