const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Login = require("./models/Login");
const User = require("./models/User");
const CompetitorRate = require('./models/CompetitorRate');
const secretKey = "";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

mongoose
  .connect("mongodb://localhost:27017/data", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected succesfully");
  })
  .catch(err => {
    console.log(err);
  });

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to db at /data/db/");
});

//Add new user
app.post("/api/signup", (req, res) => {
  const {
    name,
    username,
    password,
    city,
    street,
    zipcode,
    state,
    company
  } = req.body;
  Login({
    username,
    password
  })
    .save()
    .then(savedUser => {
      User({
        name,
        city,
        street,
        zipcode,
        state,
        company,
        loginId: savedUser._id
      })
        .save()
        .then(userData => res.send(userData));
    })
    .catch(err => {
      res.send(err);
    });
});

app.post("/api/login", (req, res) => {
  let username = req.body.username;
  let pwd = req.body.password;

  Login.findOne({ username: username }, (err, user) => {
    if (err) {
      res.send(err);
    }
    //if the user is found then compare passwords to the one found in the database
    if (user) {
      user.comparePassword(pwd, (err, match, token) => {
        if (err) {
          res.send(err);
        }

        if (match) {
          const userData = {
            _id: user._id,
            username: user.username
          };
          res.json({ token: token, user: userData });
        } else {
          res.json({ error: true });
        }
      });
    } else {
      res.send(false);
    }
  });
});

app.post('/competitor-rate', (req, res) => {
  const { name, year, prices } = req.body;
  const data = {name, prices}
  CompetitorRate.findOneAndUpdate({ name }, { $push: { data } } , (err, competitor) => {
    cons
  })
})

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/build" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
