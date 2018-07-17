const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./form.db')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')

app.post('/rooms', (req, res) => {
    db.run(`INSERT INTO ranqi(name, building_no, department_no, floor_no, mobile) VALUES(?,?,?,?,?)`, [req.body.name, 7, req.body.department_no, req.body.floor_no, req.body.mobile], function (err) {
        if (err) {
            return console.log(err.message)
        }

        res.redirect('/')
    })
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM ranqi', [], function (err, rows) {
        res.render('index.ejs', {
            rooms: rows
        })
    })
})

app.get('/list', (req, res) => {
    db.all('SELECT * FROM ranqi', [], function (err, rows) {
        res.render('list.ejs', {
            rooms: rows
        })
    })
})

app.delete('/rooms/:mobile', (req, res) => {
    db.run(`DELETE FROM ranqi WHERE mobile=?`, req.params.mobile, function (err) {
        if (err) {
            return console.error(err.message)
        }

        res.send(`delete record in DB for ${req.params.mobile}`)
    })
})


let port = process.env.PORT || 3000

app.listen(port, function () {
    console.log(`app running on port ${port}`)
})