// Задание 8
// Войти на главную страницу http://localhost/litecart
// Проверить наличие стикиров на товарах на главной странице

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var By = webdriver.By;
var until = webdriver.until;
var test = require('selenium-webdriver/testing');
var assert = require('assert');


test.describe('Check Main Left menu', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismiss'})
            .forBrowser('chrome')
            .build();
        driver.manage().timeouts().implicitlyWait(10000/*ms*/);

        driver.get('http://localhost/litecart/');
    });

    test.it('Проверяем', function() {

        var elemTab = driver.findElements(By.xpath("//*[@id='content']/ul/li/a"));

        // Клик по меню
        for (var i = 0; i < elemTab.length; i++) {
            var elem = driver.findElement(By.xpath("//!*[@id='content']/ul/li["+i+"]/a")).Click();
            var id =elem.hash;

            var elemLink = driver.findElements(By.css( elem.hash.toString() + " .products .product a"));
            var elemSticker = driver.findElements(By.css( elem.hash.toString() + " .products .product .sticker"));
            if (elemLink.length = elemSticker.length)
                assert.ok(elemSticker.length, "")

        }
    });

    test.it('Проверяем 2', function() {

        var elemLink = driver.findElements(By.css(".products .product a"));
        var elemSticker = driver.findElements(By.css(".products .product .sticker"));
        if (elemLink.length = elemSticker.length) {
            assert.ok(elemSticker.length, "")
        }
    });


    test.after(function() {
        driver.quit();
    });
});