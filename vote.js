var apiKey = "" //put your api key from proxy11.com, its free
var url = require('url');
var https = require('https');
var HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch')


const makeVoteCall= async( ip, port)=>{
  let proxy = `http://${ip}:${port}`
  let proxyAgent = await new HttpsProxyAgent(proxy);
  let options = {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-DE,en-US;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://www.fedscoop.com/fedscoop50/vote/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{ \"full_name\": \"Jacqueline Smith\", \"award_name\":\"fedscoop50\", \"year\":\"2021\", \"category\":\"Most Inspiring Up & Comer\"}",
    "method": "POST",
    "mode": "cors",
    "credentials": "omit",
    "httpsAgent": `"${proxyAgent}"`
    }
  await fetch('https://www.fedscoop.com/fedscoop50/vote/', options);
  return console.log(`${new Date()}: Voted from: ${ip}:${port}`)
}

const getProxyData=()=>{
  try {
    fetch(`https://proxy11.com/api/proxy.json?key=${apiKey}&limit=20`)
    .then( res => res.json() )
    .then( data => {
      data.data.forEach(element => {
        makeVoteCall(element.ip, element.port)
        }
      );
    })
  } catch (error) {
    console.log(error)
  }

}

(function myLoop(i) {
  setTimeout(function() {
    getProxyData(); //  your code here                
    if (--i) myLoop(i);   //  decrement i and call myLoop again if i > 0
  }, (Math.random() * (600000 - 60000) + 60000) )   // (600000 - 60000) + 60000)
})(process.argv[2]);                   //  pass the number of iterations as an argument

