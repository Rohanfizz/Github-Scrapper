let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
let path = require('path');
const { ADDRGETNETWORKPARAMS } = require('dns');

function workForOneTopic(url){
    request(url,cb);
    function cb(err,response,html){
        if(err) console.log(err);
        else{
            let cheerioSelector = cheerio.load(html);
            let topicName = cheerioSelector(".h1").text().trim();
            let newFolder = path.join('./Answer',topicName);
            fs.mkdir(newFolder,function cb(err){
                if(err) console.log(err);
                else console.log('Folder Mad`e')
            });

            let topicRepos = cheerioSelector(".f3.color-fg-muted.text-normal.lh-condensed");
            for(let i = 0;i<8;i++){
                let repoLink = cheerioSelector(topicRepos[i]).find('a');
                repoLink ="https://github.com"+ cheerioSelector(repoLink[1]).attr('href');
                // console.log(repoLink);
                makeJsonRepos.fn(repoLink);

            }

        }
    }
}

module.exports = {
    fn: workForOneTopic,
}