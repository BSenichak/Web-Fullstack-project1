// модулі для роботи з http, файловою системою, path, та querystring
const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

// функція що читає файл з html
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

// функція що створює http сервер
http.createServer((req, res) => {
    // обробка запитів
    switch (req.url) {
        // запит на головну сторінку
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
            break;
        // запит на список продуктів
        case "/products":
            getProducts(req, res);
            break;
        // запит на додавання продукту
        case "/add":
            addProduct(req, res);
            break;
        default:
            // запит на якусь іншу сторінку
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("404 Not Found");
            break;
    }
}).listen(18012, () => console.log("http://localhost:18012"));

function getProducts(req, res) {
    // ініціалізуємо об'єкт продуктів
    let products = { products: [] };

    // перевіряємо чи існує файл db.json
    if (fs.existsSync(path.join(__dirname, "db.json"))) {
        // читаємо дані з файлу
        const data = fs.readFileSync(path.join(__dirname, "db.json"));
        // парсимо дані в об'єкт
        products = JSON.parse(data.toString());
    }

    // встановлюємо заголовок відповіді
    res.writeHead(200, { "Content-Type": "application/json" });
    // відправляємо відповідь з продуктами
    res.end(JSON.stringify(products));
}


function addProduct(req, res) {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk;
    });
    req.on("end", () => {
        // парсимо дані з форми
        data = querystring.parse(data);

        // отримуємо всі продукти
        let products = { products: [] };
        if (fs.existsSync(path.join(__dirname, "db.json"))) {
            products = JSON.parse(
                fs.readFileSync(path.join(__dirname, "db.json"), "utf8")
            );
        }

        // додаємо новий продукт
        products.products.push(data);

        // зберігаємо всі продукти
        fs.writeFileSync(
            path.join(__dirname, "db.json"),
            JSON.stringify(products)
        );

        // перенаправляємо на головну сторінку
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
    });
}


