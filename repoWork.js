let request = require('request');
let fs = require('fs');
let cheerio = require('cheerio');
let path = require('path');
// work("https://github.com/rails/rails","./Answer/test");
function work(url,folderPath){
    request(url,cb);
    function cb(err,response,html){
        if(err) console.log(err);
        else{
            let cheerioSelector = cheerio.load(html);
            
            let repoName = cheerioSelector(".mr-2.flex-self-stretch").text().trim();
            // console.log("Making file",path.join(folderPath+(repoName+".json")))
            let issuePage = url+"/issues";

            request(issuePage,cb);
            let ans = "";
            function cb(err,response,html){
                if(err) console.log(err);
                else{
                    let cheerioSelector = cheerio.load(html);
                    let issues = cheerioSelector('.flex-auto.min-width-0.p-2.pr-3.pr-md-2>a');
                    let ans = "";
                    for(let i = 0;i<issues.length;i++){
                        ans += i + " " + cheerioSelector(issues[i]).text() +"\n";
                    }
                    // console.log(ans);
                    fs.writeFileSync(path.join(folderPath,(repoName+".json")),ans);
                }
            }
            

            // fs.writeFileSync(path.join(folderPath,(repoName+".json")),filler(url+"/issues"));
        }
    }
}
function filler(url){
    
}

module.exports = {
    singleRepo : work
}