// items start at row 11, cells A to I
const XLSX = require("xlsx");
const QRCode = require("qrcode");
const fs = require("fs");
const workbook = XLSX.readFile("TT codes Test.xlsx");
const worksheet = workbook.Sheets[workbook.SheetNames[0]];



const prods = [];
let prod = {};

for (let cell in worksheet) {
  const cellAsString = cell.toString();

  if (cellAsString[0] === "A") {
    prod.buyer = worksheet[cell].v;
  }
  if (cellAsString[0] === "B") {
    prod.producer = worksheet[cell].v;
  }
  if (cellAsString[0] === "C") {
    prod.gtin = worksheet[cell].v;
  }
  if (cellAsString[0] === "D") {
    prod.productNameRus = worksheet[cell].v;
  }
  if (cellAsString[0] === "E") {
    prod.productNameEng = worksheet[cell].v;
  }
  if (cellAsString[0] === "F") {
    prod.unitAggr = worksheet[cell].v;
  }
  if (cellAsString[0] === "G") {
    prod.idCode = worksheet[cell].v;
  }
  if (cellAsString[0] === "H") {
    prod.statusIdCode = worksheet[cell].v;
  }
  if (cellAsString[0] === "I") {
    prod.dateIdCode = worksheet[cell].v;
    prods.push(prod);
    prod = {};
  }
}

let items = prods.slice(4);
// for each item -> create a qr code and save it to a file

let textArray = items.map(item => {
  return (
    item.productNameRus
  )
})

let imageArray = items.map((item,i) => {
  // console.log(QRCode.toFile('code'+i+'.png', (item.productNameRus, item.statusIdCode)))
  return(
    QRCode.toFile('./images/code'+i+'.png', (item.productNameRus + item.buyer + item.producer + item.gtin + item.productNameEng + item.unitAggr + item.dateIdCode + item.idCode + item.statusIdCode))
    ).then (function(result) {
      //console.log(result)
  })
})



let cells = textArray.map((text, i) => {
  return (
    
    text//, imageArray[i]
  )
})

console.log(cells)



  
  
  
  // items to pdf


