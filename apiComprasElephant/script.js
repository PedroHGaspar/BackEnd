const express = require('express');
const app = express();
const port = 3000;

//conectando ao Banco de dados SQL
const pg = require("pg");
const database = new pg.Client("postgres://vzjiwujv:bSmcnIMnEFKvtczXtTAG6I-SpNG5ShW7@silly.db.elephantsql.com/vzjiwujv")

database.connect((erro) => {
    if (erro) {
        return console.log("não foi possivel se conectar com o ElephantSQL", erro)
    } else {
        return console.log("Conectado ao ElephantSQL!")
    }
})

const compras = [
    { id: 1, descricao: 'Capacete', preco: 500.00 },
    { id: 2, descricao: 'Iphone 13', preco: 9000.00 },
    { id: 3, descricao: 'Caixa de som', preco: 150.50 },
    { id: 4, descricao: 'Mouse gamer', preco: 200.00 },
    { id: 5, descricao: 'Canivete Suíço', preco: 500.00 }
]

const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.post("/tabela", (req, res) => {
    const createTableQuery = `
    CREATE TABLE clientes (
    id NUMERIC(2) PRIMARY KEY,
    descricao VARCHAR(255),
    preco NUMERIC(6)
    )
    `;
    // Conectar ao banco de dados e criar a tabela
    database.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Erro ao criar a tabela:', err);
        } else {
            console.log('Tabela criada com sucesso!');
        }
        database.end();
    });
    res.status(200).send({
        message: "tabela criado com sucesso",
    })
})


//Método HTTP para buscar dados
app.get('/compras', (req, res) => {
    database.query("SELECT * FROM clientes").then(
        (resultado) => {
            res.status(200).send({ produtos: resultado.rows })
        },
        (erro) => {
            res.status(500).send({ erro: erro })
            console.log(erro)
        }
    )
})



//Método HTTP para cadastrar um novo dado
app.post("/cadastrar", (req, res) => {

    const query = "INSERT INTO clientes(id, descricao, preco) VALUES ($1, $2, $3);"
    const values = [req.body.id, req.body.descricao, req.body.preco]

    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: "produto cadastrado com sucesso!" })

        },
        (erro) => {
            res.status(500).send({ erro: erro })
            console.log(erro)
        }
    )
})

//Método HTTP para excluir um dado ja existente
app.delete("/deletar/:id", (req, res) => {

    const query = "DELETE FROM clientes WHERE id=$1;"
    const values = [req.params.id]

    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: "produto removido com sucesso!" })

        },
        (erro) => {
            res.status(500).send({ erro: erro })
            console.log(erro)
        }
    )
})

app.get('/valor-total', (req, res) => {
    database.query("SELECT * FROM clientes")
        .then((resultado) => {
            const valorTotal = resultado.rows.reduce((acumulador, cliente) => acumulador + parseInt(cliente.preco), 0);
            res.status(200).send({ valorTotal: valorTotal });
        })
        .catch((erro) => {
            res.status(500).send({ erro: erro });
            console.log(erro);
        });
});


app.listen(port, () => {
    console.log(`Servidor express rodando na porta: ${port}`);
})