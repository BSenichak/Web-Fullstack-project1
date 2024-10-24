const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");

const db = require("./db");

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });


app.get("/", (req, res) => {
    db.query("SELECT * FROM products", (err, rows) => {
        let products = rows;
        products.forEach((product) => {
            product.image = JSON.parse(product.image);
        })
        res.render("index", { products});
    })
});

app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    db.query("SELECT * FROM products WHERE id = ?", postId , (err, rows) => {
        if(err || rows.length === 0) return res.status(404).render("notfound");
        let product = rows[0];
        product.image = JSON.parse(product.image);
        res.render("post", { product });
    })
});

app.post("/add", upload.fields([{ name: "image" }]), (req, res) => {
    let data = req.body;
    data.image = req.files.image.map((file) => file.filename);
    data.image = JSON.stringify(data.image);
    db.query("INSERT INTO products SET ?", data, (err) => {
        res.status(201);
        res.end();
    })
});

app.use((req, res, next) => {
    res.status(404);
    res.render('notfound');
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
