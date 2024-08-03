const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const chatFilePath = path.join(__dirname, 'data', 'chat.ntggpt');

app.get('/get-chat', (req, res) => {
    fs.readFile(chatFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading chat file.');
        }
        res.send(data);
    });
});

app.post('/save-chat', (req, res) => {
    const chatContent = req.body.chatContent;
    fs.writeFile(chatFilePath, chatContent, 'utf8', (err) => {
        if (err) {
            return res.status(500).send('Error saving chat file.');
        }
        res.send('Chat saved successfully.');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
