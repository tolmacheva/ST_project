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
        this.driver.get('http://localhost/litecart/en/checkout');
        return this;
    }

    basketRows() {
            return this.driver.findElements(By.css("#box-checkout-cart table.dataTable tr.row"));
        }

    deleteProductAndCheckSummary() {
        return this.basketRows().then((rows) => {
            var arrDel = [];
            for (var i = 1; i < rows.length; i++) {
                arrDel.push(
                    this.driver.findElement(By.css("#box-checkout > div.summary.wrapper"))
                        .then((checkElem) => {
                            rows[i].findElements(By.css("td")).then((cells) => {
                                cells[6].click().then((clickDel) => {
                                    this.driver.wait(until.stalenessOf(checkElem), 1000);
                                });
                            });
                        })
                );
            }
        });
        $q.all(arrDel);
    }

}

exports.BasketPage = BasketPage;