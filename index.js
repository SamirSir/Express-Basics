const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Worlds !!!');
});

app.get('/courses', (req, res) => {
    res.send({ courses: ['Angular', 'Node', 'Express'] });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port} ...`));
