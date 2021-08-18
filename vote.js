const fetch = require('node-fetch')

const vote = async () => {
const res = await fetch("https://www.fedscoop.com/fedscoop50/vote/", {
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
  "credentials": "omit"
    });
    return res
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

for (let i = 0; i < process.argv[2]; i++) {
        vote()
        console.log('I voted!')
        sleep(1000)
}

