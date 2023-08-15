const express = require('express');
const app = express();
const port = 3000;

const pg = require("pg");
const database = new pg.Client("postgres://afdrcwfj:jK2n-_awVJt7tIcmVm2__NATMR7OYp1-@silly.db.elephantsql.com/afdrcwfj");

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

    const abvFloat = parseFloat(abv);

    const insertQuery = `
      INSERT INTO cervejas (id, nome, abv, tipo, nacionalidade)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [id, nome, abvFloat, tipo, nacionalidade];

    database.query(insertQuery, values, (erro, result) => {
        if (erro) {
            console.error("erro ao inserir cerveja:", erro);
            res.status(500).json({ error: "erro ao inserir cerveja" });
        } else {
            console.log("Cerveja inserida com sucesso:", result.rows[0]);
            res.status(201).json({ message: "Cerveja inserida com sucesso" });
        }
    });
});


app.post("/cervejaria", (req, res) => {
    const createTableQuery = `
    CREATE TABLE cervejas (
    id NUMERIC(100) PRIMARY KEY,
    nome VARCHAR(255),
    abv NUMERIC(3, 1),
    tipo VARCHAR(255),
    nacionalidade VARCHAR(255)
    )
    `;

    // Conectar ao banco de dados e criar a tabela
    const values = [req.body.id, req.body.nome, req.body.abv, req.body.tipo, req.body.nacionalidade]
    database.query(createTableQuery, (erro, result) => {
        if (erro) {
            console.error('erro ao criar a tabela:', erro);
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
    database.query(createTableQuery, (erro, result) => {
        if (erro) {
            console.error('erro ao DELETAR.', erro);
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



//GET PARA BUSCAR CERVEJA PELO NOME e ja faz a busca parcial com o LIKE do sql
app.get("/cervejaria/buscar-por-nome/:nome", (req, res) => {
    const nomeParcial = "%" + req.params.nome + "%"; // aqui ele faz a req pelo nome

    const searchQuery = `
      SELECT * FROM cervejas
      WHERE nome LIKE $1;
    `;

    database.query(searchQuery, [nomeParcial], (erro, result) => {
        if (erro) {
            console.error("erro ao buscar cerveja:", erro);
            res.status(500).json({ error: "erro ao buscar cerveja" });
        } else {
            res.status(200).json({ produtos: result.rows });
        }
    });
});


//GET PARA BUSCAR CERVEJA PELA NACIONALIDADE
app.get("/cervejaria/buscar-por-nacionalidade/:nacionalidade", (req, res) => {
    const nacionalidadeCerveja = req.params.nacionalidade; // aqui ele faz a req pela nacionalidade

    const searchQuery = `
      SELECT * FROM cervejas
      WHERE nacionalidade = $1;
    `;

    database.query(searchQuery, [nacionalidadeCerveja], (erro, result) => {
        if (erro) {
            console.error("erro ao buscar cerveja:", erro);
            res.status(500).json({ error: "erro ao buscar cerveja" });
        } else {
            res.status(200).json({ produtos: result.rows });
        }
    });
});

app.put('/cervejaria/atualizarId/:id', (req, res) => {
    const getId = parseInt(req.params.id);
    const { nome, abv, tipo, nacionalidade } = req.body;

    const updateQuery = `
        UPDATE cervejas
        SET nome = $1, abv = $2, tipo = $3, nacionalidade = $4
        WHERE id = $5`;

    const values = [nome, abv, tipo, nacionalidade, getId];

    database.query(updateQuery, values, (erro, result) => {
        if (erro) {
            console.error("erro ao atualizar cerveja:", erro);
            res.status(500).json({ error: "erro ao atualizar cerveja" });
        } else {
            res.status(200).json({ message: "Cerveja atualizada com sucesso" });
        }
    });
});




//GET PARA BUSCAR CERVEJA PELA tipo e ja faz a busca parcial com o LIKE do sql
app.get("/cervejaria/buscar-por-tipo/:tipo", (req, res) => {
    const tipoCerveja = req.params.tipo; // aqui ele faz a req pela tipo

    const searchQuery = `
      SELECT * FROM cervejas
      WHERE tipo = $1;
    `;

    database.query(searchQuery, [tipoCerveja], (erro, result) => {
        if (erro) {
            res.status(500).json({ error: "erro ao buscar cerveja" });
        } else {
            res.status(200).json({ produtos: result.rows + "Deu certo"});
        }
    });
});


//ORDENAR POR ASC E DESC pelo SQL
app.get('/cardapio/ordenar/:ordeByAbv', (req, res) => {
    const { ordeByAbv } = req.params; //aqui a  gente coloca uma constante fixa para ela poder ser pesquisada por maiorParaMenor e menorParaMaior

    let query;
    if (ordeByAbv === 'maiorParaMenor') {
        query = `SELECT * FROM cervejas ORDER BY abv DESC`;
    } else if (ordeByAbv === 'menorParaMaior') {
        query = `SELECT * FROM cervejas ORDER BY abv ASC`;
    } else {
        res.status(400).json({ error: 'Deu erro em alguma coisa' });
        return;
    }

    database.query(query).then(
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
