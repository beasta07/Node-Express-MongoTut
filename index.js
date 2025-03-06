const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate= require('./modules/replaceTemplate');
////////FILES
// const textIn=fs.readFileSync('./txt/input.txt','utf-8')
// console.log(textIn);

// const textOut = `This is what we know about the avacado : ${textIn} \n Created on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt',textOut)

// console.log('File has been written');

//Non-blocking
// fs.readFile('./txt/start.txt','utf-8', (err,data1)=> {
// fs.readFile(`./txt/${data1}.txt`,'utf-8', (err,data2)=> {
//     console.log(data2)
//     fs.readFile(`./txt/append.txt`,'utf-8', (err,data3)=> {
//         console.log(data3)
//         fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8', err => {
// console.log('Your file has been written')
//         })
//     } )
// } )
// } )
// console.log('Will READ File')

/////////

/////////////////////SERVER

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8",
  (err, data) => {
console.log("No template overview page",err)  }
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8",
  (err, data) => {
    console.log("No template cA RD overview page",err)  }
  
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8",
  (err, data) => {
    console.log("No template cARD overview page",err)  }
  
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {

const {query,pathname} =url.parse(req.url, true)
console.log(query,pathname)
  //Overview
  if (pathname === "/overview") {
   const cardsHtml= dataObj.map(el => replaceTemplate(tempCard, el)).join('')

   const output = templateOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
    res.end(output);
  //Product
  } else if (pathname === "/product") {
    const product= dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)
    console.log(query)
    res.end(output);

  //API
  } else if (pathname === "/api") {
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
