const express = require('express');
const books= require('./books');
const path = require('path'); 
const app = express();
const idFilter = req => member => member.id === parseInt(req.params.id);

app.use(express.json());
app.use(express.urlencoded  ({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const PORT=3001;
app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));
app.get('/api/books', (req, res) => {res.json(books);});

app.get('/books/:id', (req, res) => {
    const found = books.some(idFilter(req));
    
    if(found){
        res.json(books.filter(idFilter(req)));
    } else{
        res.status(400).json({msg: `No book with the id of ${req.params.id}`});
    }
});

app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        name: req.body.name,
        author: req.body.author,
        status: 'available'
    };
    if(!newBook.name || !newBook.author){
        return res.status(400).json({msg: 'Please include a name and author'});
    }
    books.push(newBook);
    res.json(books);
});

app.delete('/books/:id', (req, res) => {
    const found = books.some(idFilter(req));
    
    if(found){
        res.json({msg: 'Book deleted', books: books.filter(books => books.id !== parseInt(req.params.id))});
    } else{
        res.status(400).json({msg: `No book with the id of ${req.params.id}`});
    }
});

app.put('/books/:id', (req, res) => {
    const found = books.some(books => books.id === parseInt(req.params.id));
    if(found){
        const updbook = req.body;
        books.forEach(
            books=>{
                if(books.id===parseInt(req.params.id)){
                    books.name = updbook.name ? updbook.name : books.name;
                    books.author = updbook.author ? updbook.author : books.author;
                    res.json({msg: 'Book updated', books});
                }
            }
        );
    }
    else{
        res.status(400).json({msg: `No book with the id of ${req.params.id}`});
    }
});