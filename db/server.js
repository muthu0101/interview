var express = require('express');
var path = require('path');
const cors = require('cors');

var app = express();
app.use(cors());

// you don't need this line!
// app.use(express.static(path.join(__dirname)));


app.get('/users', function(req, res){
    res.contentType('application/xml');
    res.sendFile(path.join(__dirname , 'dataset.xml'));
});



var server = app.listen(8080, () => {
	console.log('Started listening on 8080');
});