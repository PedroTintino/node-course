const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
});

// force redirect from a page who doesn't exist anymore.
app.get('/old-page(.html)?', (req, res) => {
    res.redirect( 301,'new-page.html');
});

app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('Hello World!');
}) ;

// We can even create a route handler chain

const one = (req, res, next) => {
    console.log('one');
    next()
}

const two = (req, res, next) => {
    console.log('two');
    next()
}
const three = (req, res, next) => {
    console.log('three');
    res.send('chain finished!')
};

app.get('/chain(.html)?', [one, two, three]);


// Now with someone request something that doesn't exist using all (*)
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

// Route handlers

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));