var inquirer = require('inquirer');

inquirer.prompt([

    {
      type: "input",
      name: "item",
      message:
      `
           ~crunchy store~
      What would you like to buy?
      `
    }
  ]).then(function(item){
      console.log(item);
  })