const express = require('express');
const path = require('path')
const api = require('./routes/index');

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', api)

// go from index to notes
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// go from notes to index
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// for user to see action and show url
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

