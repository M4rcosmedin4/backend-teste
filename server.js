const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const prom = require('prom-client');
const itemRoutes = require('./routes/itemRoutes');
const register = prom.register


const app = express();
const port = process.env.PORT || 5000;



// Middleware geral
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose
  .connect(
    'mongodb+srv://marcos060703:dasv6262@cluster0.vnjw9uo.mongodb.net/nomeDoSeuBanco?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));


app.get('/metrics',async function(req,res) {
  res.set('Content-type',register.contentType)
  res.end(await register.metrics())
})

app.get('/',(req,res)=>{
  counter.inc()
  res.send('hello world')
})

const frontendAccessCounter = new prom.Counter({
  name: 'frontend_access_total',
  help: 'Contador de acessos ao frontend',
});

// Rota para rastrear acessos ao frontend
app.post('/track-frontend-access', (req, res) => {
  frontendAccessCounter.inc(); // Incrementa o contador
  res.status(200).send('Acesso rastreado com sucesso');
});



// Rotas da API
app.use('/api/items', itemRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});