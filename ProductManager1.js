import * as fs from 'fs'
import { Product } from "./Product.js";

class ProductManager extends Product {
  constructor(title, description, price, thumbnail, code, stock) {
    super(title, description, price, thumbnail, code, stock);
    this.products = [];
    // this.path = "./products.txt"
  }

  static addId() {
    if (this.idAutoinc) {
      this.idAutoinc++;
    } else {
      this.idAutoinc = 1;
    }
    return this.idAutoinc;
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    // await fs.writeFile(this.path, "")
    let cont = await fs.readFile('./products.txt', 'utf-8')
    let aux = JSON.parse(cont)
    this.products = aux

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("All fields are required");
      return;
    }

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].code === code) {
        console.log("Code must be unique");
        return;
      }
    }

    this.products.push({
      id: ProductManager.addId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });

    console.log(this.products)
    await fs.writeFile(this.ruta, JSON.stringify(this.products))
    }
  }

  // getProducts() {
  //   return this.products;
  // }

  // getProductById(id) {
  //   for (let i = 0; i < this.products.length; i++) {
  //     if (this.products[i].id === id) {
  //       return this.products[i];
  //     }
  //   }
  //   console.log("Not found");
  // }
// }

const productManager = new ProductManager();
productManager.addProduct("tanque", "tanque para agua de 500 L", 15000, "tanque.jpg", "tanq500l", 11); 
// productManager.addProduct("vanitory", "vanitory de 50 cm", 22000, "vanit50.jpg", "van50std", 14);
// productManager.addProduct("bomba de agua", "bomba de agua de 1/2 HP", 12000, "qb60.jpg", "van50std", 55);
// console.log(productManager.getProducts());
// console.log(productManager.getProductById(2))
