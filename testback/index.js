const express = require("express");
const app = express();

const port = 8000;


app.get("/", (req, res) => {
  return res.send("HOMEPAGE");
});


const admin = (req, res) => {
  return res.send("ADMIN DASHBOARD");
}


const isAdmin = (req, res, next) => {
  console.log("isAdmin is running");
  next();
}

const isLoggedIn = (res, req, next) => {
  console.log("isLoggerdIn is running");
  next();
}

app.get("/admin", isLoggedIn, isAdmin, admin);



app.get("/login", (req, res) => {
  return res.send("visiting login route")
});

app.get("/signout", (req, res) => {
  return res.send("visiting signout route")
});

app.get("/signup", (req, res) => {
  return res.send("visiting signup route")
});

app.get("/hitesh", (req, res) => {
  return res.send("hitesh uses instagram")
});

app.listen(port, () => {
  console.log("server is up")
});

// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })