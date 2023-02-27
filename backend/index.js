const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("Images"));
app.use("/images", express.static("Images"));
//MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books where id=?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", upload.single("cover"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    url + "/Images/" + req.file.filename,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id=?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted");
  });
});

app.put("/books/:id", upload.single("cover"), (req, res) => {
  const bookId = req.params.id;
  const url = req.protocol + "://" + req.get("host");
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    url + "/Images/" + req.file.filename,
  ];
  const q =
    "UPDATE books SET `title` = ? ,`desc` = ? ,`price` = ? ,`cover` = ? WHERE id = ?";
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book modified");
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
