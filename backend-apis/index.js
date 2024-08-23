const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser');
const {api} = require('./src');

const {DatabaseLoader} = require('./src/loaders/database.loader');
DatabaseLoader.init();

const app = express();

// Middleware that transforms the raw string of req.body into json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// parses incoming requests with JSON payloads
app.use(cors());
app.options("*", cors());
const upload_path = path.join(__dirname,'src','uploads');
console.log(upload_path)
app.use(express.static(upload_path));
api.init(app)

const PORT = 3001;

app.listen(PORT, () => console.log(`
          ==================================
          🚀 Server running on port ${PORT}! 🚀
          ================================== 
        `));
