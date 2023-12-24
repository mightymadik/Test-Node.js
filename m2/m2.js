const amqp = require('amqplib');
const winston = require('winston');
const config = require('./config.json');

// Логгер
const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

async function startConsuming() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'task_queue';

  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, (msg) => {
    if (msg) {
      const content = msg.content.toString();
      const message = JSON.parse(content);

      // Ваша обработка сообщения, например:
      const numberParam = message.numberParam || 0;
      const result = numberParam * 2;

      logger.info(`Processed message: ${content}. Result: ${result}`);

      // Отправка результата в другую очередь или куда-либо еще, если необходимо

      // Подтверждение получения сообщения из очереди
      channel.ack(msg);
    }
  });
}

startConsuming().catch((error) => {
  logger.error(`Error while starting the consumer: ${error.message}`);
});
