const express = require('express');
const app = express();


app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

let products = []

app.get('/', (req, res) => {
    res.render('index', { products: products });
});

app.post('/ads', (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
});

app.post('/add', (req, res) => {
    let data = req.body;
    data.id = products.length;
    products.push(data);
    res.end()
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
