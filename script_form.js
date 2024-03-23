const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Подключаемся к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/personalPageDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Создаем схему данных для нашей коллекции
const userInfoSchema = new mongoose.Schema({
    email: String,
    tel: String,
    range: Undefined,
    date: Undefined,
    datetimelocal: Undefined,
    radio: Undefined,
    file: Undefined,
    time: Undefined, 
    week: Undefined,
    month: Undefined
});

// Создаем модель на основе схемы
const UserInfo = mongoose.model('UserInfo', userInfoSchema);

// Используем body-parser для парсинга JSON данных
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Отправляем статический HTML файл с формой
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Обрабатываем полученные данные из формы
app.post('/submit', function(req, res) {
    const userInfo = new UserInfo({
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
        range: req.body.range,
        date: req.body.date,
        datetimelocal: req.body.datetimelocal,
        radio: req.body.radio,
        file: req.body.file,
        time: req.body.time, 
        week: req.body.week,
        month: req.body.month
    });

    userInfo.save(function(err) {
        if (err) {
            console.log(err);
            res.send('Ошибка при сохранении данных');
        } else {
            res.redirect('/info');
        }
    });
});

// Отправляем данные на отдельную страницу для отображения
app.get('/info', function(req, res) {
    UserInfo.find({}, function(err, data) {
        if (err) {
            console.log(err);
            res.send('Ошибка при загрузке данных');
        } else {
            res.send(data);
        }
    });
});

// Прослушиваем порт 3000
app.listen(3000, function() {
    console.log('Сервер запущен на порту 3000');
});
