const express = require('express');
const app = express();
var path = require('path');

app.use(express.static('./'))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , 'index.html'))
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});