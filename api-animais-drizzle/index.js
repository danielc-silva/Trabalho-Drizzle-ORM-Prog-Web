import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { animais } from './schema.js';
import { eq } from 'drizzle-orm';

const app = express();
app.use(express.json());

// 1. Conexão com o PostgreSQL
const pool = new pg.Pool({
  connectionString: 'postgres://postgres:postgres@localhost:5432/banco-animais'
});
const db = drizzle(pool);

// 2. Rota para Listar todos os animais (SELECT * FROM animais)
app.get('/animais', async (req, res) => {
  const lista = await db.select().from(animais);
  res.json(lista);
});

// 3. Rota para Cadastrar animal (INSERT INTO animais VALUES (...))
app.post('/animais', async (req, res) => {
  const { nome, especie, idade } = req.body;
  await db.insert(animais).values({ nome, especie, idade });
  res.status(201).json({ mensagem: 'Animal cadastrado com sucesso!' });
});

// PUT /animais/:id - Atualizar dados de um animal existente
app.put('/animais/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, especie, idade } = req.body;

    // Executa o UPDATE no PostgreSQL filtrando pelo id
    const resultado = await db
      .update(animais)
      .set({
        nome: nome,
        especie: especie,
        idade: Number(idade)
      })
      .where(eq(animais.id, id))
      .returning(); // Retorna o registro alterado

    // Se o array voltar vazio, significa que o ID não existia no banco
    if (resultado.length === 0) {
      return res.status(404).json({ mensagem: 'Animal não encontrado para atualização.' });
    }

    res.status(200).json({
      mensagem: 'Animal atualizado com sucesso!',
      animal: resultado[0]
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar o animal.' });
  }
});

// DELETE /animais/:id - Deletar um animal pelo ID
app.delete('/animais/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Executa o DELETE no PostgreSQL filtrando pelo id
    const resultado = await db
      .delete(animais)
      .where(eq(animais.id, id))
      .returning(); // Confirma qual registro foi excluído

    if (resultado.length === 0) {
      return res.status(404).json({ mensagem: 'Animal não encontrado para remoção.' });
    }

    res.status(200).json({ mensagem: 'Animal removido com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao remover o animal.' });
  }
});

app.listen(3000, () => console.log('API rodando em http://localhost:3000'));