const port = 3333;

const express = require("express");
let app = express();

const cors = require("cors");
app.use(cors());

// app.all("/form_handler/put", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   // res.header("Access-Control-Allow-Headers", "Con1tent-Type");
//    res.header("Accept", "*/*");

//   console.log("API CALLED");
//   next();
// });


app.use(express.json()) 

const data = [
  {
    id: "AsghUA9JAc7NqP7spxHus",
    name: "Univer1",
    web_pages: ["www.ru", "www.leningrad"],
    country: "France",
  },
  {
    id: "UWbpogIlOgiSLRqZsf2Pd",
    name: "Univer2",
    web_pages: ["www.ru"],
    country: "France",
  },
  {
    id: "BTmDI_IeXckHfmd7HTnrJ",
    name: "Univer3",
    web_pages: ["www.ru"],
    country: "France",
  },
  {
    id: "63tlP3-hwuuysogUyAi12",
    name: "UUNIT",
    web_pages: ["www.ugatu.ru", "www.bgu.ru"],
    country: "Russian Federation",
  },
  {
    id: "9znRars8zJyh8ZLHubx6r",
    name: "UGNTU",
    web_pages: ["www.ugntu.ru", "ww.ru"],
    country: "Russian Federation",
  },
  {
    id: "VfTT-TqwkbgzuM7lL5K7_",
    name: "BGAU",
    web_pages: ["www.bgau.ru"],
    country: "Russian Federation",
  },
];

app.get("/search", function (req, res, next) {
  const country = req.query.country;
  console.log("GET API CALLED ?country=", country);
  res.json(
    data.filter((univer) => (country ? univer.country === country : true))
  );
  next();
});

app.post("/form_handler/post", function (req, res, next) {
  console.log("POST API CALLED ", req.body);
  if (req.body) res.send("ok");
  next();
});

app.put("/form_handler/put", function (req, res, next) {
  console.log("PUT API CALLED ", req.body);
  if (req.body) res.send("ok");
  next();
});

app.delete("/form_handler/delete", function (req, res, next) {
  console.log("DELETE API CALLED ", req.body);
  if (req.body) res.send("ok");
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
