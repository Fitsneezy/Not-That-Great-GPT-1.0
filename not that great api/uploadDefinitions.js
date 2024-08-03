const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

let definitions = [];

fs.readFile(path.join(__dirname, 'definitions.json'), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading definitions.json:', err);
        return;
    }
    definitions = JSON.parse(data);
});

app.post('/getDefinition', (req, res) => {
    const word = req.body.word.toLowerCase();
    const definition = definitions.find(def => def.word.toLowerCase() === word);

    if (definition) {
        res.json({ definition: definition.definition });
    } else {
        res.json({ definition: null });
    }
});

app.post('/uploadDefinitions', (req, res) => {
    const newDefinitions = req.body;
    definitions = newDefinitions;

    fs.writeFile(path.join(__dirname, 'definitions.json'), JSON.stringify(definitions, null, 2), (err) => {
        if (err) {
            console.error('Error writing to definitions.json:', err);
            return res.status(500).send('Error writing to definitions.json');
        }
        res.send('Definitions uploaded successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
