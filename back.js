const express =  require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require("mysql2")
const cors = require("cors")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "abc123",
    database: "crud_contact"
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get", (req,res) => {
    const sqlGet = "SELECT * FROM contact_db"
    db.query(sqlGet, (error, result) => {
        res.send(result)
    })
})

app.post('/api/post', (req,res) => {
    const {name,email,contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES (?,?,?)"
    db.query(sqlInsert, [name,email,contact], (error,result) => {
        if(error) {
            console.log(error)
        }
    })
})

app.delete('/api/remove/:id', (req,res) => {
    const {id} = req.params;
    const sqlDelete = "DELETE FROM contact_db WHERE id = ?"
    db.query(sqlDelete, id, (error,result) => {
        if(error) {
            console.log(error)
        }
    })
})


app.get('/api/get/:id', (req,res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?"
    db.query(sqlGet, id, (error,result) => {
        if(error) {
            console.log(error)
        }
        res.send(result)
    })
})

app.put('/api/get/:id', (req,res) => {
    const {id} = req.params;
    const {name,email,contact} = req.body
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WEHRE id = ?"
    db.query(sqlUpdate, [name,email,contact,id], (error,result) => {
        if(error) {
            console.log(error)
        }
        res.send(result)
    })
})

app.get("/", (req,res) =>{

    // const sqlInsert = "INSERT INTO contact_db (name,email,contact) VALUES ('harsha','harsha@gmail.com', '654789')"
    // db.query(sqlInsert, (error, result) => {
    //     console.log("error", error)
    //     console.log("result", result)
    //     res.send("hello express")
    // })
    
})

app.listen(process.env.PORT ||5000, ()=>{
    console.log("server is running port  5000")
})