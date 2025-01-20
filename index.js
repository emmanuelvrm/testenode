const express = require('express');
const app = express();

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Dados simulados em memória
let items = [
  { id: 1, name: 'Item 1', description: 'Descrição do Item 1' },
  { id: 2, name: 'Item 2', description: 'Descrição do Item 2' },
];

// Rota inicial (GET /)
app.get('/', (req, res) => {
  res.send('Olá! Bem-vindo à API Node.js! Use o Postman para testar.');
});

// Rota para obter todos os itens (GET /items)
app.get('/items', (req, res) => {
  res.json(items);
});

// Rota para obter um item pelo ID (GET /items/:id)
app.get('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }
  res.json(item);
});

// Rota para criar um novo item (POST /items)
app.post('/items', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Os campos name e description são obrigatórios' });
  }

  const newItem = {
    id: items.length + 1,
    name,
    description,
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// Rota para atualizar um item (PUT /items/:id)
app.put('/items/:id', (req, res) => {
  const { name, description } = req.body;
  const item = items.find((i) => i.id === parseInt(req.params.id));

  if (!item) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  if (name) item.name = name;
  if (description) item.description = description;

  res.json(item);
});

// Rota para excluir um item (DELETE /items/:id)
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  items.splice(itemIndex, 1);
  res.status(204).send(); // Retorna sem corpo
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
