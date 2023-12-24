const express = require('express');
const amqp = require('amqplib');
const winston = require('winston');
const config = require('./config.json');

const app = express();
const PORT = config.port;

// Middleware для разбора тела запроса в формате JSON
app.use(express.json());

// Логгер
const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

// Логирование содержимого запроса
app.use((req, res, next) => {
  console.log('Received request with body:', req.body);
  next();
});

// Роут для обработки HTTP POST запросов
app.post('/', async (req, res) => {
  // Проверка наличия req.body и req.body.param
  if (req.body && req.body.param !== undefined) {
    // Получение числового параметра из запроса
    const numberParam = parseInt(req.body.param, 10);

    // Проверка, является ли numberParam числом
    if (!isNaN(numberParam)) {
      // Отправка параметра в RabbitMQ
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      channel.sendToQueue('task_queue', Buffer.from(JSON.stringify({ numberParam })));

      logger.info(`Sent to RabbitMQ: ${numberParam}`);
      res.sendStatus(200);
    } else {
      logger.error(`Invalid parameter value: ${req.body.param}`);
      res.status(400).json({ error: 'Invalid parameter value' });
    }
  } else {
    logger.error('Missing parameter in the request');
    res.status(400).json({ error: 'Missing parameter in the request' });
  }
});

app.listen(PORT, () => {
  logger.info(`M1 listening on port ${PORT}`);
});
