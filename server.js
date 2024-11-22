const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');


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



app.get('/',(req,res)=>{
  res.send('hello world')
})




// Rotas da API
app.use('/api/items', itemRoutes);

// Iniciar o servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});
