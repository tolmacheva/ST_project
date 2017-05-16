// Задание 13
// Войти на страницу http://localhost/litecart
// Cценарий добавления товаров в корзину и удаления товаров из корзины.


var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var By = webdriver.By;
var until = webdriver.until;
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var Key = webdriver.Key;
var $q = require('q');

test.describe('Регистрация пользователя', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismiss'})
            .forBrowser('chrome')
            .build();

        driver.get('http://localhost/litecart/');
        driver.manage().timeouts().implicitlyWait(10000);
    });

    test.after(function() {
        //driver.quit();
    });

    test.it('Добавляем товар', function() {

        var inputField;
        var i = 0;
        var sizeProduct = ["Small", "Medium", "Large"]

        driver.findElement(By.css("#box-campaigns > div > div > div")).click()
            .then(
                (click) => {
                    driver.findElement(By.css("#site-menu li.general-0 > a")).click();
                    return true;
                },
                (err) => {
                    return false;
                }
            );

        sizeProduct.map((curElem)=>{
            driver.findElement(By.css("#box-campaigns > div > div > div")).then(function () {

                driver.findElement(By.css("#box-campaigns > div > div > div")).click().then((click) => {

                    inputField = driver.findElement(By.css("#box-product > div > div:nth-child(3) > div > div.buy_now > form > div:nth-child(3) > select"))
                    driver.wait(driver.executeScript("arguments[0].value = '" + curElem + "'", inputField), 1000);
                    driver.findElement(By.css("#box-product  button[name = 'add_cart_product']")).click();

                    driver.wait(until.elementTextContains(driver.findElement(By.css("#cart span.quantity")), i), 10000);

                    driver.findElement(By.css("body > div.featherlight.active > div > ul > li:nth-child(1) > a")).click();
                    driver.wait(until.elementIsVisible(driver.findElement(By.css("#box-campaigns > div > div > div"))), 10000);
                });
                i++;
            });
        });

        driver.findElement(By.css("#cart > a")).click();
        var arrDel =[];
        driver.findElements(By.css("table tr td:nth-child(6) i.fa-trash"))
            .then((Elems) =>{
                Elems.map((curElem) => {
                    arrDel.push(
                        driver.findElements(By.css("table tr td:nth-child(6) i.fa-trash"))
                            .then(function () {
                                var checkElem = driver.findElement(By.css("#box-checkout > div.summary.wrapper"));
                                driver.findElement(By.css("table  tr:nth-child(1) > td:nth-child(6) i.fa-trash")).click()
                                    .then((clickDel) => {
                                        driver.wait(until.stalenessOf(checkElem),1000);
                                    });
                            })
                    )
                });
                $q.all(arrDel);
            });
    });
});