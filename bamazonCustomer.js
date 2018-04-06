// Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) {
    console.error(err);
  }
  loadAll();

});

  function loadAll() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      promptCustomer(res);

    });
  }

  function promptCustomer(inventory) {
     inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Enter the ID of what you want to buy.",
        }
      ])
      .then(function(val) {
        var selectID = parseInt(val.choice);
        var product = checkInventory(selectID, inventory);
        if (product) {
          promptQuant(product);
        }
        else {
          console.log("That item is not in the inventory.");
          loadAll();
        }
      });
  }

  function promptQuant(product) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "quantity",
          message: "Enter how many you want to buy?",
        }
      ])
      .then(function(val) {
        var quantity = parseInt(val.quantity);
        if (quantity > product.stock_quantity) {
          console.log("Insufficient quantity in stock!!");
          loadAll();
        }
        else {
          buy(product, quantity);
        }
      });
  }

  function buy(product, quantity) {
    connection.query(
      "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
      [quantity, product.item_id],
      function(err, res) {
        console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
        loadAll();
      }
    );
  }


  function checkInventory(selectID, inventory) {
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].item_id === selectID) {
        return inventory[i];
      }
    }
    return null;
  }