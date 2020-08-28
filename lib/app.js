const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api/v1/apiroutes', require('./routes/apiRoutes'));
app.use('/api/v1/topsearch', require('./routes/topsearch'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
