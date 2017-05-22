/**
 * Корзина
 */

var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;
var $q = require('q');


var inputField;

class BasketPage {
    constructor(driver) {
        this.driver = driver;
    }

    open(){
        this.driver.get('http://localhost/litecart/en/checkout')
        return this;
    }

    basketRows() {
            return this.driver.findElements(By.css("#table.items tr.item"));
        }

    deleteProductAndCheckSummary() {
        var arrDel =[];
        this.driver.findElements(By.css("#box-checkout-cart table.items tr.item"))
            .then((rows) =>{
                rows.map((row) => {
                    arrDel.push(
                        this.driver.findElements(By.css("#box-checkout-cart table.items tr.item"))
                            .then((elems) =>{
                                this.driver.findElement(By.css("#box-checkout > div.summary.wrapper"))
                                    .then((checkElem) => {
                                        elems[1].findElement(By.css("button[name =remove_cart_item]")).click()
                                            .then((clickDel) => {
                                                this.driver.wait(until.stalenessOf(checkElem), 1000);
                                            })
                                    });
                            })
                    )
                });
                $q.all(arrDel);
            });
    }
}

exports.BasketPage = BasketPage;