DROP DATABASE IF EXISTS crunchy_store;

CREATE DATABASE crunchy_store;

USE crunchy_store;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(45) NOT NULL,
  item_description VARCHAR(100),
  sales_price DECIMAL(10,2) NOT NULL,
  inventory_qty INT(10) DEFAULT (0),
  units_sold_qty INT(10) DEFAULT (0),
);

INSERT INTO products (item_name, item_description, sales_price, inventory_qty,)
VALUES ("Striped Tee","Crunchy Tee with yellow and white stripes.",17.75,100);

INSERT INTO products (item_name, item_description, sales_price, inventory_qty,)
VALUES ("Red Tee","Crunchy Tee with red lettering.",11.50,100);

INSERT INTO products (item_name, item_description, sales_price, inventory_qty,)
VALUES ("Classic Sweats","Classic sweats with signature crunchy logo.",15.25,100);

INSERT INTO products (item_name, item_description, sales_price, inventory_qty,)
VALUES ("Crunchy Jacket","Nylon Crunchy jacket in blue.",30.00,100);

