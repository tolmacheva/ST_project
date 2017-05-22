/**
 * Страница продукта
 */
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;


class ProductPage {
    constructor(driver) {
        this.driver = driver;
    }

    open(){
        this.driver.get('http://localhost/litecart/en/rubber-ducks-c-1/yellow-duck-p-1');
    }


    backHome(){
        this.driver.findElement(By.linkText("Home")).click();
    }
}

exports.ProductPage = ProductPage;