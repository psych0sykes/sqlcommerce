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
  con.query("SELECT * FROM products", function (err, result) {
    if (err) throw err;
    products = result;
    getItems(result)
  });
};

function getInventory (id,qty,cb){
    con.query("SELECT * FROM products WHERE id = ?", [id], function (err, result) {
      if (err) throw err;
      cb(result[0],qty);
    })
};

function updateProducts (id,col,value){
  con.query("UPDATE products SET ?? = ? WHERE id = ?", [col,value,id], function (err, result){
    if (err) throw err;
  });
}


// ============================ INQUIRER FUNCTIONS =============================>
function whatToBuy(){
  console.log("     ~crunchy store~")
let customerChoice = inquirer.prompt([

    {
      type: "input",
      name: "item",
      message:"What would you like to buy?"
    },
    {
      type: "input",
      name: "qty",
      message: "How many would you like to buy?"
    }
  ]).then(function(x) {
    let id = x.item;
    let qty = x.qty;

    console.log("Item: " + products[x.item].item_name);
    console.log("QTY: " + x.qty);
    console.log("Total Price: $" + (products[x.item].sales_price * x.qty))

    // CHECK INVENTORY

    getInventory(id,qty,function(item,qty){
    
    // IF STATEMENT
      let newQty = item.inventory_qty - qty;

    console.log("Checking inventory..... " + item.item_name);
    console.log("");
      if(newQty > 0) {
        console.log("Purchase Complete!")
        updateProducts(id,"inventory_qty",newQty);
      }
      else{
        console.log("Insufficient Qty for Order...")
      }
      console.log("...");
      console.log("");
      console.log("");
      console.log("");

      runProgram();
    });

  });
};


// =============================== RUN PROGRAM ================================= >
function runProgram(){
whatToBuy();
getProducts();
};                                

function connect() {
con.connect(function(err) {
if (err) throw err;
runProgram();
});
};

connect();