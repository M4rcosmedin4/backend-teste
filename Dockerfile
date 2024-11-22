# Usar uma imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar o package.json e instalar as dependências
COPY package*.json ./
RUN npm install

# Copiar todo o código da aplicação
COPY . .

# Expor a porta em que o servidor vai rodar
EXPOSE 3000

# Definir o comando para rodar a aplicação
CMD ["npm", "start"]
