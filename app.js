const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

http.createServer((req, res) => {
    switch (req.url) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
            break;
        case "/products":
            getProducts(req, res);
            break;
        case "/add":
            addProduct(req, res);
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("404 Not Found");
            break;
    }
}).listen(3000, () => console.log("http://localhost:3000"));

function getProducts(req, res) {
    let products = { products: [] };
    if (fs.existsSync(path.join(__dirname, "db.json"))) {
        const data = fs.readFileSync(path.join(__dirname, "db.json"));
        products = JSON.parse(data.toString());
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
}

function addProduct(req, res) {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk;
    });
    req.on("end", () => {
        data = querystring.parse(data);
        let products = { products: [] };
        if (fs.existsSync(path.join(__dirname, "db.json"))) {
            products = JSON.parse(
                fs.readFileSync(path.join(__dirname, "db.json"), "utf8")
            );
        }
        products.products.push(data);
        fs.writeFileSync(
            path.join(__dirname, "db.json"),
            JSON.stringify(products)
        );
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
    });
}

