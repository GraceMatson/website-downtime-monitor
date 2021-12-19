const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const Bree = require('bree');




dotenv.config({ path: './config/config.env' });


const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


const bree = new Bree({
    jobs: [        
        {
            name : 'WebsiteGet',
            interval : '10s'
        }
    ]
});
bree.start();

app.listen(PORT, ()=> {
    console.log(` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.italic.bold);
})