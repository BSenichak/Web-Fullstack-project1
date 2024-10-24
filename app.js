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

app.post('/add', (req, res) => {
    let data = req.body;
    products.push(data);
    res.status(201)
    res.end()
});


app.use((req, res, next) => {
    res.status(404);
    res.render('notfound');
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
