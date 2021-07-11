const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
const apiKey = 'c2206c49a186bdded150ff78fea282c4';
const returnScrapperApiUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

//WELCOME
app.get('/', (req,res) => {
    res.send('Welcome to Amazon India Scrapper API..');
});

//GET PRODUCTS BY ID
app.get('/products/:productId', async (req,res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try{
        const response = await request(`${returnScrapperApiUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.send(JSON.parse(response));
    } catch(err) {
        res.json(err);
    }
});

//GET PRODUCT REVIEWS
app.get('/products/:productId/reviews', async (req,res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try{
        const response = await request(`${returnScrapperApiUrl(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`);
        res.send(JSON.parse(response));
    } catch(err) {
        res.json(err);
    }
});

//GET PRODUCT OFFERS
app.get('/products/:productId/offers', async (req,res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try{
        const response = await request(`${returnScrapperApiUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.send(JSON.parse(response));
    } catch(err) {
        res.json(err);
    }
});

//GET SEARCH RESULTS
app.get('/search/:searchQuery', async (req,res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;
    try{
        const response = await request(`${returnScrapperApiUrl('c2206c49a186bdded150ff78fea282c4')}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.send(JSON.parse(response));
    } catch(err) {
        res.json(err);
    }
});

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });