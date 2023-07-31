const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const compras = [
    { id: 1, descricao: "Playstation 5", preco: 4550.00 },
    { id: 2, descricao: "Batman", preco: 150.00 },
    { id: 3, descricao: "Bola de Basquete", preco: 100.00 },
    { id: 4, descricao: "Figurinha", preco: 10.00 },
    { id: 5, descricao: "Hot Wheels", preco: 70.00 },
]

app.get('/compras', (req, res) => {
    res.json(compras);
});

app.post('/compras', (req, res) => {
    const novaCompra = req.body;
    compras.push(novaCompra);
    res.json(novaCompra);
});

app.put('/compras/:id', (req, res) => {
    const compraId = parseInt(req.params.id);
    const compraAtualizada = req.body;
    const compraExistente = compras.find((compra) => compra.id === compraId);

    if (compraExistente) {
        compraExistente.descricao = compraAtualizada.descricao;
        compraExistente.preco = compraAtualizada.preco;
        res.json(compraExistente);
    } else {
        res.status(404).json({ message: 'Compra não encontrada.' });
    }
});

app.get('/compras/total', (req, res) => {
    const total = compras.reduce((callBack, compra) => callBack + compra.preco, 0);
    res.json({ total });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.delete ('/compras/:id', (req, res) => {
    const compraId = req.params.id;
    const index = compras.findIndex((compras) => compras.id === compraId)
    console.log(compraId, "compraID")
    console.log(index, "index")

    if(index){
        compras.splice (index, 1)
        res.json("Compra apagada com sucesso")
    }else{
        res.status(404).json({message: "A compra não foi apagada com sucesso"})
    }
})
