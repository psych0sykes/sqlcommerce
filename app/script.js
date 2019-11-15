var mysql = require('mysql');
var inquirer = require('inquirer')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crunchy_store"
});


var products = [];


// Get all item names
function getItems (array) {
    let data = [];
    console.log("=======================")
    for(i=0; i < array.length; i++){
        data.push(array[i].item_name)
        console.log(i + " - " + array[i].item_name);
    };
    // console.log(data);
    return data;
}

// Get all products and assign to variable.
function getProducts(cb){
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM products", function (err, result) {
    if (err) throw err;
    products = result;
    getItems(result)
  });
});
};


// ============================ INQUIRER FUNCTIONS =============================>
function whatToBuy(){
let customerChoice = inquirer.prompt([

    {
      type: "input",
      name: "item",
      message:
      `
           ~crunchy store~
      What would you like to buy?
      `
    }
  ]).then(function(x) {
    console.log(products[x.item]);
  });
};


// =============================== RUN PROGRAM ================================= >


getProducts(whatToBuy());