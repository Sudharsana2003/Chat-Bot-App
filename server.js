const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const port = 2222;
const MongoClient = mongodb.MongoClient;
const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB URI
const dbName = 'chatapp'; // Replace with your database name

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); // Serve HTML and CSS files

// Your MongoDB connection and API routes go here

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectToDatabase();

app.get('/api/chat', async (req, res) => {
    const question = req.query.question;
    const collection = client.db(dbName).collection('chat');

    const chat = await collection.findOne({ question });

    if (chat) {
        res.json({ answer: chat.answer });
    } else {
        res.json({ answer: 'No answer found.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
