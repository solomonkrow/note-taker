const note = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend , readFromFile , writeToFile } = require('../helpers/fsUtils')

// TODO: GET /api/notes , should read db.json and return all saved notes
note.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// TODO: POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

note.post('/', (req, res) => {
    const { title , text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))

    } else {
        res.json('Error making note!');
    }
});

// TODO: DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file

note.delete('/:id', (req, res) => {
    const id = req.params.id;
    readFromFile('./db/db.json').then((data) => {
        const parsedData = JSON.parse(data);
        const updatedNote = parsedData.filter(note => {
            return note.id !== id;
        })

        writeToFile('./db/db.json', updatedNote)

        res.json('Ok')
    })

})

module.exports = note;