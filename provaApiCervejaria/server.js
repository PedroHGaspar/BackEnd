const express = require('express');
const app = express();
const port = 3000;

const pg = require("pg");
const database = new pg.Client("postgres://myocfakh:mqzhVjnxc_mRf5wXsDhd4FwBzFXX-1tQ@silly.db.elephantsql.com/myocfakh");

database.connect((erro) => {
    if (erro) {
        return console.log("não foi possivel se conectar com o ElephantSQL", erro);
    } else {
        return console.log("Conectado ao ElephantSQL!");
    }
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.post("/inserir-cerveja", (req, res) => {
    const { id, nome, abv, tipo, nacionalidade } = req.body;

    const insertQuery = `
      INSERT INTO cervejas (id, nome, abv, tipo, nacionalidade)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [id, nome, abv, tipo, nacionalidade];

    database.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error("Erro ao inserir cerveja:", err);
            res.status(500).json({ error: "Erro ao inserir cerveja" });
        } else {
            console.log("Cerveja inserida com sucesso:", result.rows[0]);
            res.status(201).json({ message: "Cerveja inserida com sucesso" });
        }
    });
});


app.post("/cervejaria", (req, res) => {
    const createTableQuery = `
    CREATE TABLE cervejas (
    id NUMERIC(5) PRIMARY KEY,
    nome VARCHAR(255),
    abv NUMERIC(5),
    tipo VARCHAR(255),
    nacionalidade VARCHAR(255)
    )
    `;

    const values = [req.body.id, req.body.nome, req.body.abv, req.body.tipo, req.body.nacionalidade]
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

app.delete("/cerveja-delete", (req, res) => {
    const createTableQuery = `
    delete * FROM cervejas
    `;

    const values = [req.body.id, req.body.nome, req.body.abv, req.body.tipo, req.body.nacionalidade]
    // Conectar ao banco de dados e criar a tabela
    database.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Erro ao DELETAR.', err);
        } else {
            console.log('TUDO FOI DELETADO!');
        }
        database.end();
    });
    res.status(200).send({
        message: "DELETADO COM SUCESSO",
    })
})





app.get('/cardapio', (req, res) => {
    database.query("SELECT * FROM cervejas").then(
        (resultado) => {
            res.status(200).send({ produtos: resultado.rows });
        },
        (erro) => {
            res.status(500).send({ erro: erro });
            console.log(erro);
        }
    );
});



app.listen(port, () => {
    console.log(`Servidor express rodando na porta: ${port}`);
});
