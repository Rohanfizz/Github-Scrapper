let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
let path = require('path');
let makeJsonRepos = require('./repoWork.js');

function workForOneTopic(url){
    request(url,cb);
    function cb(err,response,html){
        if(err) console.log(err);
        else{
            let cheerioSelector = cheerio.load(html);
            let topicName = cheerioSelector(".h1").text().trim();
            let newFolder = path.join("./Answer",topicName);
            if(fs.existsSync(newFolder) == false) fs.mkdirSync(newFolder);

            let topicRepos = cheerioSelector(".f3.color-fg-muted.text-normal.lh-condensed");
            for(let i = 0;i<8;i++){
                let repoLink = cheerioSelector(topicRepos[i]).find('a');
                repoLink ="https://github.com"+ cheerioSelector(repoLink[1]).attr('href');
                // console.log(repoLink);
                makeJsonRepos.singleRepo(repoLink,newFolder);
            }

        }
    }
}

module.exports = {
    fn: workForOneTopic
}