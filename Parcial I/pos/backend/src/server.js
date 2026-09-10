// -g es global, evitar usar
// npm i -D nodemon

/*
    Cómo levantar o correr el servidor:
    1. node ./src/server.js
       nodemon ./src/server.js
    * Estando eb Thunderclient hay que asegurarse que POST esté en JSON y escribir con comillas dobles ("):
        {
            "id":4,
            ""
        }
    2. abrir thunderclient, hacer un get
    3. abrir thunderclient, hacer un post

*/

import express from 'express';

const products = [
    { id: 1, name: "" },
    { id: 2, name: "" },
    { id: 3, name: "" },
]

const server = express();

server.use()

server.get('/products', (req, res)=>{
    res.json(products);
});

server.post('/products', (req, res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const product = {id, name}
    products.push({id, name});

    res.status(201).json({product, message:"ok"})
})

server.listen(3000, ()=>{
    console.log('server is running on port 3000');
});