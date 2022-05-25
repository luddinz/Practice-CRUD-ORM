const express = require("express");
const { Catalog } = require("./models");

const PORT = 3000;

const app = express();

// Kita perlu tambahkan line ini sebelum use Router
// Dipakai untuk handle request dari Form
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Dipakai untuk memasang view Engine EJS
app.set("view engine", "ejs");

// Untuk menampilkan seluruh data Catalog
app.get("/catalogs", (req, res) => {
  Catalog.findAll().then((catalogs) => {
    res.render("catalogs/index", {
      catalogs,
    });
  });
});

// GET /Catalogs/create menampilkan Form Create
app.get("/catalogs/create", (req, res) => {
  res.redirect("catalogs/create");
});

// POST /Catalogs buat catalog baru
app.post("/catalogs", (req, res) => {
  Catalog.create({
    product_name: req.body.product_name,
    product_color: req.body.product_color,
    product_price: req.body.product_price,
    product_description: req.product_description,
  }).then((catalog) => {
    res.send("Catalog has success create");
  });
});

app.get("/catalogs/:id", (req, res) => {
  Catalog.findOne({
    where: { id: req.params.id },
  }).then((catalog) => {
    // Karena hasil dari promise findOne adalah object,
    // Maka bisa kita lempar langsung ke method render
    res.render("catalogs/show", { data: catalog.dataValues });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on https://localhost:${PORT}`);
});
