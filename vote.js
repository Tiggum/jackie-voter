var apiKey = "" //put your api key from proxy11.com, its free
var url = require('url');
var https = require('https');
var HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch')

const getProxyData=()=>{
  try {
    fetch(`https://proxy11.com/api/proxy.json?key=${apiKey}&limit=20`)
    .then( res => res.json() )
    .then( data => {
      
      data.data.forEach(element => {
        
          (async () => {

            var proxy = `http://${element.ip}:${element.port}`

            const proxyAgent = await new HttpsProxyAgent(proxy);

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

            const response = await fetch('https://www.fedscoop.com/fedscoop50/vote/', options);
          })();
        }
      );
    })
  } catch (error) {
    console.log(error)
  }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

for (let i = 0; i < process.argv[2]; i++) {
  getProxyData()
  console.log('I voted!')
  sleep(30000)
}
