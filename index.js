const express = require('express');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const courses = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'Node' },
    { id: 3, name: 'Express' },
    { id: 4, name: 'MongoDB' }
];

app.get('/', (req, res) => {
    res.send('Hello Worlds !!!');
});

app.get('/courses', (req, res) => {
    res.send({ courses });
});

app.post('/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send({
        id: courses.length + 1,
        name: req.body.name
    });
});

/**
 * reading params
 */
app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course) {
        res.send(courses[req.params.id]);
    } else {
        res.status(404).send({ status: 'error', message: `There is no course with id: ${req.params.id}` })
    }
});

/**
 * reading query or optional query-params
 */
app.get('/courses/:year/:month', (req, res) => {
    res.send(req.query)
});

app.listen(port, () => console.log(`Listening on port ${port} ...`));
