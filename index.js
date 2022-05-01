const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const courses = ['Angular', 'Node', 'Express'];

app.get('/', (req, res) => {
    res.send('Hello Worlds !!!');
});

app.get('/courses', (req, res) => {
    res.send({ courses });
});

/**
 * reading params
 */
app.get('/courses/:id', (req, res) => {
    res.send(courses[req.params.id]);
});

/**
 * reading query or optional query-params
 */
app.get('/courses/:year/:month', (req, res) => {
    res.send(req.query)
});

app.listen(port, () => console.log(`Listening on port ${port} ...`));
