const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500' ]
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

// ROUTES
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

// Now with someone request something that doesn't exist using all (*)
app.all('*', (req, res) => {
    res.status(404);
    // Costumizing our 404 errors
    if (req.accepts('html')){ 
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    else if (req.accepts('json')){ 
        res.json({ error: '404 not  Found' });
    } 
    else{
        res.type('txt').send('404 Not Found');
    }
});

// error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));