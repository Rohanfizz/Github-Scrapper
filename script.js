let request = require('request');
let cheerio = require('cheerio');
let workFromOneTopic  = require('./workFromOneTopic.js');
let url = 'https://github.com/topics/';

request(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
        let cheerioSelector = cheerio.load(html);
        let topics = cheerioSelector(".col-12.col-sm-6.col-md-4.mb-4");
        console.log(topics.length);
        for(let i = 0;i<topics.length;i++){
            let topicUrl ="https://github.com"+ cheerioSelector(topics[i]).find('a').attr('href');
            console.log(topicUrl.trim());
            workFromOneTopic.fn(topicUrl);
        }
    }   
}
