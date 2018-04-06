DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT(5) NOT NULL,
  stock_quantity INT(5) NOT NULL,
  primary key(item_id)
);


SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
  ("Item 1", "Clothes", 45, 75),
  ("Item 2", "Books", 10, 54),
  ("Item 3", "Food", 5, 50),
  ("Item 4", "Electronics", 145, 100),
  ("Item 5", "TV", 555, 50),
  ("Item 6", "Books", 23, 54),
  ("Item 7", "Phone", 650, 22),
  ("Item 8", "Games", 12, 100),
  ("Item 9", "Accesories", 7, 10),
  ("Item 10", "Clothes", 21, 50);