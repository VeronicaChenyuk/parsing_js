const needle = require('needle');
const cheerio = require('cheerio')
const fs = require('fs');
let savedData = []
url = 'http://oto-register.autoins.ru/oto/'
needle
  .get(url, function (err, res) {
    if (err) throw (err);
    const $ = cheerio.load(res.body)
    let date = $("#mainForm table tbody a");

    date.map(function (i, val) {
      savedData.push($(val).text())
    })
    fs.writeFile('data.json', JSON.stringify(savedData, null, 4), function (err) {
      if (err) console.log(err);
      else console.log('Data Saved to data.json file');
    })
  })

