// items start at row 11, cells A to I
const QrImage = require("qr-image");
const XLSX = require("xlsx");
const QRCode = require("qrcode");
const fs = require("fs");
const pdfkit = require("pdfkit");
const pdftable = require("voilab-pdf-table");
const workbook = XLSX.readFile("TT codes Test.xlsx");
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const pdf = new pdfkit({
    autoFirstPage: false,
  }),
  table = new pdftable(pdf, {
    bottomMargin: 30,
  });

table
  // add some plugins (here, a 'fit-to-width' for a column)
  .addPlugin(
    new (require("voilab-pdf-table/plugins/fitcolumn"))({
      column: "description",
    })
  )
  // set defaults to your columns
  .setColumnsDefaults({
    headerBorder: "Y",
    align: "center",
  })
  // add table columns
  .addColumns([
    {
      id: "description",
      header: "Product",
      align: "left",
    },
    {
      id: "quantity",
      header: "Quantity",
      width: 50,
    },
    {
      id: "price",
      header: "Price",
      width: 40,
    },
    {
      id: "total",
      header: "Total",
      width: 70,
      renderer: function (tb, data) {
        return "CHF " + data.total;
      },
    },
  ])
  // add events (here, we draw headers on each new page)
  .onPageAdded(function (tb) {
    tb.addHeader();
  });

// if no page already exists in your PDF, do not forget to add one
pdf.addPage();

// draw content, by passing data to the addBody method
table.addBody([
  { description: "Product 1", quantity: 1, price: 20.1, total: 20.1 },
  { description: "Product 2", quantity: 4, price: 4.0, total: 16.0 },
  { description: "Product 3", quantity: 2, price: 17.85, total: 35.7 },
]);

pdf.end();
pdf.pipe(fs.createWriteStream("output3.pdf"));
