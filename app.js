const express = require('express');
const app = express();
app.use(express.static('client'));
app.use('/upload', express.static('uploads'));
app.use(express.urlencoded());
const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');



app.use(cors());

const ideas = require('./ideas.json');
app.post('/upload', upload.single('photo'),(req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    const idea = req.body;
    idea['photo'] = req.file.filename;
    ideas.push(idea);
    fs.writeFile('ideas.json',JSON.stringify(ideas),(err) => {
        if (err) throw err;
        // console.log('Ideas saved');
        res.send('Thank you for your ideas!');
    });
});

app.get('/ideas',(req,res) => {
    res.json(ideas);
});

const comments = require('./comment.json');

app.post('/comments', upload.none(),(req, res) => {
    // console.log(req.body);
    const comment = req.body;
    comments.push(comment);
    fs.writeFile('comment.json',JSON.stringify(comments),(err) => {
        if (err) throw err;
        // console.log('Comments saved');
        res.send('Thank you for your comments!');
    });
});


app.get('/comments',(req,res) => {
    res.json(comments);
});

module.exports = app;
