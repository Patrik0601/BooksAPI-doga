import express from 'express'
import * as db from './data/db.js'

const PORT = 3010
const app = express()
app.use(express.json())

app.get("/books", (req,res) => {
    const books = db.getBooks()
    res.status(200).json(books)
})

app.get("/books/:id", (req,res) => {
    const book = db.getBooks(req.params.id)
    if(!book){
        return res.status(404).json('Not found');
    }
    res.status(200).json(book)
})

app.post("/books", (req,res) => {
    const {author, title, year} = req.body
    if(!author || !title || !year){
        return res.status(400).json('Missing some data')
    }
    const saved = db.getBooks(title, author, year)
    const book = db.saveBook(saved.lastInsertedRowid)
    res.status(201).json(book)
})

app.put("/books/:id", (req,res) => {
    const id = req.params.id
    const check = db.getBooks(id)
    if(!check){
        return res.status(400).json('Missing some data')
    }
    const {author, title, year} = req.body
    if(!author || !title || !year){
        return res.status(400).json('Missing some data')
    }
    db.updateBook(id, title, author, year)
    const book = db.getBookByID(req.params.id)
    res.status(200).json(book)
})

app.listen(PORT, () => {
    console.log('Server runs on port: ' + PORT)
})