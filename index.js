/**
 * @description : Joi Validator
 * Needs to define schema like :: type, length, requirement, etc
*/
const express = require('express');
const app = express();
const courseRoute = require('./src/routes/course');

/**
 * use() middleware from express to parse JSON
*/
app.use(express.json());
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use('courses', courseRoute);
app.get('/', (req, res) => {
    res.send('Hello Worlds !!!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
