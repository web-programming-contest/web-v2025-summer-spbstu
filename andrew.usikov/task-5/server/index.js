const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());

// API пример
app.get('/api/data', (req, res) => {
  res.json({ message: 'Привет с Express-сервера!', time: new Date() });
});

const clientBuildPath = path.join(__dirname, '../client/public');
app.use(express.static(clientBuildPath));
  
// Все запросы отправляем в React
app.get('/', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);   
});