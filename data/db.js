import Database from 'better-sqlite3'

const db = new Database('./data/database.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    year TEXT
)`).run();

export const getBooks = () => db.prepare
    ('SELECT * FROM books').all();

export const getBookByID = (id) => db.prepare
    ('SELECT * FROM books WHERE id = ?').get(id);

export const saveBook = (title, author, year) => db.prepare 
    ('INSERT INTO books (title, author, year) VALUES (?, ?, ?)').run(title, author, year);

export const updateBook = (id, title, author, year) => db.prepare('UPDATE books SET title = ?, author = ?, year = ?, WHERE id = ?').run(id, title, author, year)