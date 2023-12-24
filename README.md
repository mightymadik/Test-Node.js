# Асинхронная обработка HTTP запросов с использованием NodeJS и RabbitMQ

Этот проект демонстрирует механизм асинхронной обработки HTTP запросов с использованием NodeJS и RabbitMQ.

Демо-видео: https://youtu.be/tNyBVafxeWk

## Структура проекта

- `m1`: Микросервис M1 для обработки входящих HTTP запросов.
- `m2`: Микросервис M2 для обработки заданий из RabbitMQ.
- `config.json`: Файлы конфигурации для каждого микросервиса.

## Установка и использование

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/mightymadik/Test-Node.js
    ```

2. Установите зависимости для каждого микросервиса:

   ```bash
    Brew (Для MacOs)
    Node.js
    RabbitMQ (Можно установить через Brew: "brew install rabbitmq")
    cd m1 (npm install)
    cd m2 (npm install)
   ```

4. Запустите RabbitMQ и каждый микросервис:

    ```bash
    # Запуск RabbitMQ
    brew services start rabbitmq
    # В одном терминале
    cd m1
    npm start или node m1.js

    # В другом терминале
    cd m2
    npm start или node m1.js
    ```

5. Отправляйте HTTP POST запросы на `http://localhost:3000/` для наблюдения за асинхронной обработкой.

## Конфигурация

- Каждый микросервис имеет свой файл конфигурации (`config.json`) для настройки RabbitMQ, логирования и т.д.

