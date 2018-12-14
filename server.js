const express = require('express');
const app = express();

app.get('/',function(req,res) {
    return res.send('hello word');
});


app.listen(process.env.PORT || 8080);