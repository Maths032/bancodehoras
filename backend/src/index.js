const express = require('express');
const routes = require('./routes')
app = express();

app.use(routes)
app.listen(3333)