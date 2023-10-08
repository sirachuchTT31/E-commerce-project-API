const express = require('express');
const app = express();
const read_directory = require('fs');
const morgan = require('morgan');
const cors_origin = require('cors');
const body_parse = require('body-parser');
const conDB = require('./config/db.connection')
app.use(morgan('dev'))
app.use(cors_origin())
app.use(body_parse.json({ limit: '10mb' }));
conDB()
read_directory.readdir('./routes', (err, res) => {
    if (err) {
        console.log(err)
    } else[
        console.log(res)
    ]
})
read_directory.readdir('./routes', (err, res) => {
    if (err) {
        console.log(err)
    } else {
        res.map((rs) => app.use('/api', require('./routes/' + rs)))
    }
})
//read_directory('./routes').map((response) => app.use('/api', require('./routes/' + response)))
app.listen(5000, () => console.log('listening on port'))