if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const db = require('./database/db');
const cors = require("cors");
const morgan = require("morgan");




const bodyParser = require('body-parser');
const sellerRoute = require("./routes/seller.route");
const buyerRoute = require("./routes/buyer.route")




const app = express();
app.use(express.json());
app.use(bodyParser.json());


app.use(morgan("dev"));
app.use(cors());

app.use("/api", sellerRoute);
app.use("/api", buyerRoute);


app.get('/', (req, res) => {
  res.send('Hello World!');
});



let port = "8080";

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
