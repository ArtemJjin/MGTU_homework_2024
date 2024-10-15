const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware для парсинга тела запроса
app.use(bodyParser.urlencoded({ extended: true }));

// Обслуживание статических файлов из директории 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Отправка HTML-формы на GET-запрос
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reg_form.html'));
});

// Обработка POST-запроса и сохранение данных в файл
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    const data = `Name: ${name}, Email: ${email}\n`;

    fs.appendFile(path.join(__dirname, 'public', 'data.txt'), data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Ошибка сохранения данных');
        }
        res.send('Данныe сохранены успешно');
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});