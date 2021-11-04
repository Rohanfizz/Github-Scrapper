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
                    let ans = [];
                    
                    for(let i = 0;i<issues.length;i++){
                        let issueLink = "https://github.com" +cheerioSelector(issues[i]).attr('href') +"\n";
                        let issueName = cheerioSelector(issues[i]).text();
                        let issueObject = {
                            Name: issueName,
                            Link: issueLink
                        }
                        ans.push(issueObject);
                    }
                    // console.table(ans);
                    let json = JSON.stringify(ans);
                    fs.writeFileSync(path.join(folderPath,(repoName+".json")),json);
            
                }
            }
            // fs.writeFileSync(path.join(folderPath,(repoName+".json")),filler(url+"/issues"));
            
        }
    }
}


module.exports = {
    singleRepo : work
}