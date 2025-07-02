const bodyParser = require("body-parser");
const { userRouter } = require("./routers/userRouter");
const { productRouter } = require("./routers/productRouter");

const express = require("express");
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(3000);
