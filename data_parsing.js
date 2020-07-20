import needle from 'needle';
import  cheerio from 'cheerio';
import htmlparser2 from 'htmlparser2'
import fs from 'fs'; 
let savedData = []

const dom = htmlparser2.parseDOM('http://oto-register.autoins.ru/oto/')
const SITE = 'http://oto-register.autoins.ru/oto/'

needle
  .get(SITE, function (err, res) {
    if (err) throw (err);
    // const $ = cheerio.load(res)
    const $ = cheerio.load(res.body)
    console.log($);
    
    // let date = $("#mainForm table tbody a");
    let date = $('#mainForm').find('table').find('tbody a');
    console.log('----',date.text());

    savedData.push({
      status: "Действующий", 
      number: $(date[1]).text(),
      name: $(date[2]).text(),
      adress: $(date[3]).text(),
      phone: $(date[4]).text()
    })

    fs.writeFile('data.json', JSON.stringify(savedData, null, 4), function (err) {
      if (err) console.log(err);
      else console.log('Data Saved to data.json file');
    })
  })

