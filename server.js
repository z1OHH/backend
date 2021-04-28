const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const database = require('./database');
const bodyParser = require('body-parser');


//Connect MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database connected successfully');
}, error => {
    console.log('Cannot connect to database ' + error)
})

const productAPI = require('./routes/products');
const historyAPI = require('./routes/history');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors());

// API
app.use('/api', productAPI);
app.use('/api-history', historyAPI);

// CREATE PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// 404 Handler
app.use((req,res ,next) => {
    next(createError(404))
})

// error Handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})