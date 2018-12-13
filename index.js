
var express = require("express");
var app = express();
var request = require("request");
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var arr = [], a, b,c, act=[], q, quote=[];

request("https://talaikis.com/api/quotes/random/", function(err,result, data){
        if(err){
            console.log(err);
        }
        else{
            q= JSON.parse(data);
            console.log(a);
            quote.push(q.quote);
            quote.push(q.author);
            quote.push(q.type);
            console.log('quote : '+ quote[0]+ quote[1]+ quote[2])
        }
    }
);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/one.ejs');
});

app.get('/catpic', function (req, res) {
    request("https://api.thecatapi.com/v1/images/search?api_key=f77f5974-32a1-48d6-b981-a40ca65a9ebb", function (err, result, data) {
        if (err) {
            console.log(err)
        }
        else {
            a = JSON.parse(data);
            //console.log(a);
            console.log(a[0].url);
            b = a[0].url;
            res.render('one', { img_link: b, text: arr, activity: act, quote: quote });

        }   //res.send('result: '+a.activity);
    });

});

app.get('/catfacts', function (req, res) {
    request("https://cat-fact.herokuapp.com/facts/random?animal=cat&amount=7", function (err, result, data) {
        const a = JSON.parse(data);
        arr = [];
        a.forEach(element => {
            arr.push(element.text);
        });
        console.log('url '+ b + 'activity '+ act[0]+'/ '+act[1] +'/ '+act[2]);
        res.render('one', {img_link: b, text : arr, activity: act, quote: quote});
    });
});

app.get('/activity', function(req, res){
    request("http://boredapi.com/api/activity/", function (err, result, data) {
        act=[];
        if (err) {
            console.log(err)
        }
        else {
            c = JSON.parse(data);
            act.push(c.activity);
            act.push(c.type);
            act.push(c.participants);
            console.log(JSON.stringify(act));
            res.render('one', { img_link: b, text : arr, activity: act, quote: quote});

        }   //res.send('result: '+a.activity);
    });
});

app.listen(port, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log('connected at ' + port);
    }
})