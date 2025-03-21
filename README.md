# Сервис обработки вопросов от покупателей в Wildberries

Этот сервис предназначен для автоматической обработки входящих вопросов от покупателей на маркетплейсе Wildberries. Сервис анализирует текст вопросов, генерирует автоматические ответы на основе ключевых слов и сохраняет историю переписки в базе данных.

## Установка и запуск

### Клонирование репозитория

```bash
git clone https://github.com/Ashimka/wb-task
```

### Установка зависимостей

```bash
npm install
```

или

```bash
yarn add
```

### Инициализация Prisma:

```bash
npx prisma init
```

### Создание таблиц в базе

```bash
npx prisma db push
```

### Настройка переменных окружения

Создайте файл .env и добавьте следующие переменные:

```Code
DATABASE_URL=<ваш_адрес_базы_данных>
WILDBERRIES_API_KEY=<ваш_API_ключ_Wildberries>
PORT=<порт_для_приложения>
```

### Старт приложения

```bash
npm run dev
```

или

```bash
yarn dev
```

Веб-интерфейс будет доступен по адресу: [http://localhost:PORT](http://localhost:PORT)

## Эндпоинты

### Получение и обработка сообщений

- **Метод:** `GET`
- **URL:** `/api/questions`

Описание

- Получает вопросы от Wildberries

- Генерирует автоматические ответы на основе ключевых слов.

- Сохраняет входящие сообщения и ответы в базу данных.

Параметры запроса для фильтрации списка сообщений и ответов:

- `Answered=false` — вопросы со статусом неотвеченные
- `Answered=true` — вопросы со статусом отвеченные
- `order=dateDesc` — сначала новые вопросы
- `order=dateAsc` — сначала старые вопросы

## Интерфейс

### Загрузка авто ответа

- Кликнуть на кнопку **Автоответ**
- Появиться блок с вопросом и ответом на 5 секунд
