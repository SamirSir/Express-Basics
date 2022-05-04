const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser').json();

const elastic = require('elasticsearch');

const elasticClient = elastic.Client({
    host: 'localhost:9200',
});

let products = [
    {
        "id": "1",
        "name": "Bottle",
        "description": "Why are you running?"
    },
    {
        "id": "2",
        "name": "Book",
        "description": "Why are you running?"
    },
    {
        "id": "3",
        "name": "Monitor",
        "description": "Why are you running?"
    },
    {
        "id": "4",
        "name": "Bottle",
        "description": "Why are you running?"
    },
    {
        "id": "5",
        "name": "Book",
        "description": "Why are you running?"
    },
    {
        "id": "6",
        "name": "Book",
        "description": "Why are you running?"
    }
];

router.use((request, response, next) => {
    elasticClient.index({
        index: 'logs',
        body: {
            url: request.url,
            method: request.method,
        },
    }).then(response => {
        console.log('Logs indexed');
    }).catch(error => {
        console.log(error);
    })
    next();
});

router.post('/products', bodyParser, (request, response) => {
    elasticClient.index({
        index: 'products',
        body: request.body
    }).then(response => {
        return response.status(200).json({
            message: 'product indexed'
        });
    }).catch(error => {
        return response.status(500).json({
            message: 'Error',
            error
        });
    })
});

router.get('/products/:id', (request, response) => {
    let query = {
        index: 'products',
        id: request.params.id
    }
    elasticClient.get(query)
        .then(response => {
            if (!response) {
                return response.status(404).json({
                    product: response
                });
            }
            return response.status(200).json({
                product: response
            });
        })
        .catch(error => {
            return response.status(500).json({
                message: 'Error not found',
                error
            });
        });
});

router.put('/products/:id', bodyParser, (request, response) => {
    elasticClient.update({
        index: 'products',
        id: request.params.id,
        body: {
            doc: request.body
        }
    }).then(response => {
        return response.status(200).json({
            message: 'product updated'
        });
    }).catch(error => {
        console.log(error)
        return response.status(500).json({
            message: 'Error',
            error
        });
    })
});

router.delete('/products/:id', (request, response) => {
    elasticClient.delete({
        index: 'products',
        id: request.params.id
    }).then(response => {
        response.status(200).json({
            message: 'Product deleted'
        });
    }).catch(error => {
        response.status(404).json({
            message: 'Error'
        });
    });
});

router.get('/products', (request, response) => {
    let query = {
        index: 'products'
    }
    if (request.query.product) query.q = `*${request.query.product}*`;

    elasticClient.search(query)
        .then(response => {
            return response.status(200).json({
                products: response.hits.hits
            });
        }).catch(error => {
            console.log(error);
            return response.status(500).json({
                message: 'Error',
                error
            });
        });
});

module.exports = router;
