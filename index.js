/**
 * @description : Joi Validator
 * Needs to define schema like :: type, length, requirement, etc
*/
const Joi = require('joi');
const express = require('express');
const app = express();
/**
 * use() middleware from express to parse JSON
*/
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));

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
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
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

app.put('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send({ status: 'error', message: `There is no course with id: ${req.params.id}` });
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);
});


app.delete('/courses/:id', (req, res) => {
    const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
    if (!courseIndex) res.status(404).send({ status: 'error', message: `There is no course with id: ${req.params.id}` });
    courses.splice(courseIndex, 1)
    res.send(courses);
});

/**
 * reading query or optional query-params
 */
app.get('/courses/:year/:month', (req, res) => {
    res.send(req.query)
});

// validators
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(2).required()
    };
    return Joi.validate(course, schema);
}
