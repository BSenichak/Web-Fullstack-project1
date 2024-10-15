const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');


app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
  const upload = multer({ storage: storage });


let products = []

app.get('/', (req, res) => {
    res.render('index', { products: products });
});

app.post('/ads', (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
});

app.post('/add', upload.single('image'), (req, res) => {
    let data = req.body;
    data.image = req.file.filename;
    data.id = products.length;
    products.push(data);
    res.end()
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
