const { Router } = require('express');
const fetch = require('node-fetch');
const convert = require('xml-js');

const router = Router();
let resultTitle;

fetch('https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en')  
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        resultJson = convert.xml2json(data, {compact: true, spaces: 4});
        let objNews = JSON.parse(resultJson);
        resultTitle = objNews['rss']['channel']['item'].map(item => item.title._text)
    })
    .catch((error) => {  
        console.log('Request failed', error)  
        });

router.get('/', (req, res) => {
    res.status(200).send(resultTitle);
});


module.exports = router;