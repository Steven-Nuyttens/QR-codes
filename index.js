// items start at row 11, cells A to I
const XLSX = require("xlsx");
const QRCode = require("qrcode");
const fs = require("fs");
const pdfkit = require("pdfkit");
const workbook = XLSX.readFile("TT codes Test.xlsx");
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const pdfTable = require("./pdfkit-tables");
const pdfDoc = new pdfkit();

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
// items to pdf

pdfDoc.pipe(fs.createWriteStream("output.pdf"));

items.forEach((item) => {
  QRCode.toString([item], function (err, string) {
    pdfDoc.image("code.png");
    pdfDoc.text(item.productNameRus);

    pdfDoc.addPage();
});
});
pdfDoc.end();
