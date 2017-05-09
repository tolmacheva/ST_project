// Задание 10
// Войти на главную страницу http://localhost/litecart
// Проверить наименование товара, цены товара (обычная, аукционная)
// Проверить стиль цены товара (обычная, аукционная)

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var By = webdriver.By;
var until = webdriver.until;
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var $q = require('q');

test.describe('Check ', function () {
    var driver;

    test.before(function () {
        driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismiss'})
            .forBrowser('chrome')
            .build();

        driver.get('http://localhost/litecart/');
        driver.manage().timeouts().implicitlyWait(10000/*ms*/);
    });

    test.after(function () {
        driver.quit();
    });

    test.it('Проверяем', function() {
        var goodName, salePrice, price;
        var salePriceSize, priceSize;

        // Наименование продукта на карточке
        driver.findElement(By.css("#box-campaigns > div > div > div > a > div.info > div.name"))
            .then(function (elem) {
                elem.getAttribute("textContent").then(function (attr) {
                    goodName = attr;
                    return goodName; });
            });

        // Основная цена продукта на карточке
        driver.findElement(By.css("#box-campaigns > div > div > div > a > div.info > div.price-wrapper > s"))
            .then(function (elem) {
                elem.getAttribute("textContent").then(function (attr) {
                 price = attr;
                 return price; });

                elem.getCssValue("color").then(function (attr) {
                    var str = attr.split("(")[1].split(",",3);
                    assert.ok( str[0]&&str[1]&&str[2], "Проверка - цвет основной цены");
                    return attr; })

                elem.getCssValue("font-size").then(function (attr) {
                    priceSize = attr;
                    return priceSize; });

                elem.getCssValue("text-decoration").then(function (attr) {
                    assert.ok(attr.indexOf("through")>0, "Проверка - основная цена зачеркнута");
                    return attr; });

        })

        // Аукционная цена продукта на карточке
        driver.findElement(By.css("#box-campaigns > div > div > div > a > div.info > div.price-wrapper > strong"))
            .then(function (elem) {
                elem.getAttribute("textContent").then(function (attr) {
                    salePrice = attr;
                    return salePrice; });

                elem.getCssValue("color").then(function (attr) {
                    var str = attr.split("(")[1].split(",",3);
                    assert.ok( str[1]&&str[2]&&"0", "Проверка  цвет акционной цены");
                    return attr;});

                elem.getCssValue("font-size").then(function (attr) {
                    salePriceSize = attr;
                    assert.ok( salePriceSize > priceSize, "Проверка - размер акционной цены больше основной цены");
                    return salePriceSize; });

                elem.getCssValue("font-weight").then(function (attr) {
                    assert.ok(attr =="bold", "Проверка - шрифт акционной цены bold");
                    return attr; });
            })

        // Страница продукта
        driver.findElement(By.css("#box-campaigns > div > div > div > a"))
            .then(function (elem) {
                elem.click();
                driver.sleep(5000);
            });

        // Наименование продукта на странице
        var h = driver.findElement(By.css("#box-product > div > div > h1")).getText()
            .then(function (text) {
                assert.ok(text ==goodName, "Проверка - наименование продукта на страницах");
            })

        // Основная цена продукта на странице
        driver.findElement(By.css("#box-product  del.regular-price"))
            .then(function (elem) {
                elem.getAttribute("textContent").then(function (attr) {
                    assert.equal(price, attr, "Проверка - основной цены продукта");
                    return price; });

                elem.getCssValue("color").then(function (attr) {
                    var str = attr.split("(")[1].split(",",3);
                    assert.ok( str[0]&&str[1]&&str[2], "Проверка - цвет основной цены");
                    return attr; })

                elem.getCssValue("font-size").then(function (attr) {
                    priceSize = attr;
                    return priceSize; });

                elem.getCssValue("text-decoration").then(function (attr) {
                    assert.ok(attr.indexOf("through")>0, "Проверка - основная цена зачеркнута");
                    return attr; });

            })

        // Аукционная цена продукта на странице
        driver.findElement(By.css("#box-product div.price-wrapper strong"))
            .then(function (elem) {
                elem.getAttribute("textContent").then(function (attr) {
                    assert.equal(salePrice, attr, "Проверка - аууционной цены продукта");
                    return salePrice; });

                elem.getCssValue("color").then(function (attr) {
                    var str = attr.split("(")[1].split(",",3);
                    assert.ok( str[1]&&str[2]&&"0", "Проверка  цвет акционной цены");
                    return attr;});

                elem.getCssValue("font-size").then(function (attr) {
                    salePriceSize = attr;
                    assert.ok( salePriceSize > priceSize, "Проверка - размер акционной цены больше основной цены");
                    return salePriceSize; });

                elem.getCssValue("font-weight").then(function (attr) {
                    assert.ok(attr =="bold", "Проверка - шрифт акционной цены bold");
                    return attr; });
            })

    });

});