// Задание 9
// Войти на страницу http://localhost/litecart/admin/?app=countries&doc=countries
// Проверить, что страны расположены в алфавитном порядке
// Для для тех стран, у которых количество зон отлично от нуля -- открыть страницу этой страны
// и там проверить, что зоны расположены в алфавитном порядке

// Войти на страницу http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones
// Зайти в каждую из стран и проверить, что зоны расположены в алфавитном порядке

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var By = webdriver.By;
var until = webdriver.until;
var test = require('selenium-webdriver/testing');
var assert = require('assert');

var userName = 'admin',
    password = 'admin';

function ChackCountries(name) {
}
test.describe('Check Main Left menu', function() {
    var driver;
    var prevCountryName = "";

    test.before(function() {

        var options = new chrome.Options();
        driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismiss'})
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        driver.get('http://localhost/litecart/admin/');
        driver.findElement(By.name('username')).sendKeys(userName);
        driver.findElement(By.name('password')).sendKeys(password);
        driver.findElement(By.xpath("//button[@name='login']")).click();
        driver.manage().timeouts().implicitlyWait(10000);
    });

    test.it('Проверяем 1', function() {

        driver.findElement(By.linkText("Countries")).click();
        driver.findElements(By.css("table > tbody > tr")).then(function (tableRows) {
            tableRows.forEach(function (row) {
                row.findElements(By.tagName("td")).then(function (cells) {
                    var countryName = cells[4].getAttribute("textContent");

                    if (prevCountryName.localeCompare(cells.get(4).getAttribute("textContent")) == -1)
                        prevCountryName = cells.get(4).getAttribute("textContent");
                    else
                        console.log(textContent + " Error");
                });
            });
        });
    });

/*
    test.it('Проверяем 2', function() {

        var elemLink, elemSticker;
        driver.findElements(By.css(".products .product a")).then(function (elemLink) {
            return elemLink;
        })
            .then(function () {
                driver.findElements(By.css(".products .product .sticker")).then(function (elemSticker) {
                    return elemSticker;
                });
            })
            .then(function (elemLink, elemSticker) {
                if (elemLink.length === elemSticker.length) {
                    assert.ok(elemSticker.length, "")
                }

            });
    });
*/


    test.after(function() {
        driver.quit();
    });
});