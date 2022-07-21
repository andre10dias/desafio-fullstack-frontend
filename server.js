const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.static(__dirname + '/dist/desafio-angular'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/desafio-angular/index.html');
});

app.listen(PORT, () => {
    console.log('Servidor angular iniciado na porta: ' + PORT);
});

