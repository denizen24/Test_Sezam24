const { Router } = require('express');
const fetch = require('node-fetch');
const convert = require('xml-js');

const router = Router();
let result;

fetch('https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en')  
    .then((res) => {
        return res.text(); // возвращаем результат работы метода и идём в следующий then
    })
    .then((data) => {
        resultJson = convert.xml2json(data, {compact: true, spaces: 4});
        let objNews = JSON.parse(resultJson);
        result = objNews['rss']['channel']['item'].map(item => item.title._text)
        console.log('Before convert:', result);
    })
    .catch((error) => {  
        console.log('Request failed', error)  
    });

router.get('/news', (req, res) => {
    res.status(200).send(result);
});


module.exports = router;