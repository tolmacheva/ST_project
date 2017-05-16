// Задание 8
// Войти на главную страницу http://localhost/litecart
// Проверить наличие стикиров на товарах на главной странице

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var By = webdriver.By;
var until = webdriver.until;
var test = require('selenium-webdriver/testing');
var promise = require('selenium-webdriver').promise;
var assert = require('assert');
var $q = require('q');

test.describe('Check Main Left menu', function() {
    var driver;
    var linlkLength,  stickLength;

    test.before(function() {
        driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismiss'})
            .forBrowser('chrome')
            .build();

        driver.get('http://localhost/litecart/');
        driver.manage().timeouts().implicitlyWait(10000/*ms*/);

    });

    test.after(function() {
        driver.quit();
    });

    test.it('Проверяем', function() {
        driver.findElements(By.css("#content > ul > li > a")).then((tabElems) => {
            var arrTab = [];
            tabElems.map((curTab) => {
                arrTab.push(
                    curTab.click().then(
                        (click) => {
                            driver.findElement(By.css("#content > ul > li.active > a"))
                                .then((elem) => {
                                    elem.getAttribute("hash").then((attr) => {

                                        var arrElems = [];
                                        driver.findElements(By.css(attr + " a")).then((elems) => {
                                            elems.map((curElem) => {
                                                arrElems.push(
                                                    curElem.findElements(By.css(".sticker"))
                                                        .then((sticks)=>{
                                                        assert.ok(sticks.length >0, "У элемента должно быть как минимум 1 стикер")
                                                        })
                                                );
                                            });
                                            $q.all(arrElems);
                                        });
                                    })
                                });                    //*[contains(@id,'campaigns')]//a//child::div[contains(@class, 'sticker')]
                            return true;
                        },
                        (err) => {
                            return false;
                        }
                    ));
            });
            $q.all(arrTab);
        });
    });

});