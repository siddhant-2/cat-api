
var express = require("express");
var app = express();
var request = require("request");
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var a;

request("http://boredapi.com/api/activity/", function(err, result, data){
    if(err){
        console.log(err);
    }
    else {
        a = JSON.parse(data);
        console.log(`a : ${a.activity}`);
    }
});


app.get('/', function (err, res) {
    var reply, text = [];
    request("https://cat-fact.herokuapp.com/facts/random?animal=cat&amount=5", function (err, result, data) {
        if (err) {
            console.log(err);
        }
        else {
            reply = JSON.parse(data);
            reply.forEach(element => {
                text.push(element.text)
            });

            //console.log(text.join('\n'));
            res.render('cat', {text : text, link : a.activity});
        }
    });
})



app.listen(port, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log('connected at '+port);
    }
})