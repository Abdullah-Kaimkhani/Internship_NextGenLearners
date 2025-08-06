import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());

// ------------------- Task 1: Book Store API -------------------
const booksFile = './books.json';

// GET all books
app.get('/books', (req, res) => {
    const books = JSON.parse(fs.readFileSync(booksFile, 'utf-8'));
    res.json(books);
});

// POST new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author required' });
    }

    const books = JSON.parse(fs.readFileSync(booksFile, 'utf-8'));
    const newBook = { id: Date.now().toString(), title, author };
    books.push(newBook);
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));

    res.status(201).json({ message: 'Book added successfully!', book: newBook });
});

// GET single book by ID
app.get('/books/:id', (req, res) => {
    const books = JSON.parse(fs.readFileSync(booksFile, 'utf-8'));
    const book = books.find( b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});

// DELETE book by ID
app.delete('/books/:id', (req, res) => {
    let books = JSON.parse(fs.readFileSync(booksFile, 'utf-8'));
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

    books.splice(bookIndex, 1);
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));

    res.json({ message: 'Book deleted successfully' });
});

// ------------------- Task 2: Feedback API -------------------
const feedbackFile = './feedback.json';

app.post('/submit-feedback', (req, res) => {
    const { name, email, message } =req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const feedbackData = JSON.parse(fs.readFileSync(feedbackFile, 'utf-8'));
    feedbackData.push({
        id: Date.now().toString(),
        name,
        email,
        message
    });

    fs.writeFileSync(feedbackFile, JSON.stringify(feedbackData, null, 2));

    res.json({ success: true, message: 'Feedback saved!' });
});

// ------------------- Start Server -------------------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});