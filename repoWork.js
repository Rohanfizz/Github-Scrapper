let request = require('request');
let fs = require('fs');
let cheerio = require('cheerio');
let path = require('path');
function work(url,folderPath){
    request(url,cb);
    function cb(err,response,html){
        if(err) console.log(err);
        else{
            let cheerioSelector = cheerio.load(html);
            
            let repoName = cheerioSelector(".mr-2.flex-self-stretch").text().trim();
            // console.log("Making file",path.join(folderPath+(repoName+".json")))
            fs.writeFileSync(path.join(folderPath,(repoName+".json")),"");
        }
    }
}

module.exports = {
    singleRepo : work
}