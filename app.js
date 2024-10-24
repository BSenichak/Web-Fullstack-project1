const express = require('express');
const app = express();

app.use(express.static('static'));
app.use(express.json());

let products = []



app.get('/', (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.sendFile('index.html');
});

app.post('/ads', (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
});

app.post('/add', (req, res) => {
    let data = req.body;
    products.push(data);
    res.status(200);
    res.redirect("/");
});

app.use((req, res, next) => {
    res.status(404);
    res.sendFile('notFound.html', { root: "static" });
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
