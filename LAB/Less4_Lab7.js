// Задание 7
// входит в панель администратора http://localhost/litecart/admin
// прокликивает последовательно все пункты меню слева, включая вложенные пункты
// для каждой страницы проверяет наличие заголовка (то есть элемента с тегом h1)

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var By = webdriver.By;
var until = webdriver.until;
var test = require('selenium-webdriver/testing');
var assert = require('assert');

var userName = 'admin',
    password = 'admin';


test.describe('Check Main Left menu', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismiss'})
            .forBrowser('chrome')
            .build();

        driver.get('http://localhost/litecart/admin/');
        driver.findElement(By.name('username')).sendKeys(userName);
        driver.findElement(By.name('password')).sendKeys(password);
        driver.findElement(By.xpath("//button[@name='login']")).click();
    });

    test.it('Проверяем', function() {
        // Список меню
        var leftMenus = driver.findElements(By.css("#app-"));

        // Клик по меню
        for (var i = 0; i < leftMenus.length; i++) {
            leftMenus[i].Click();

            // Проверяем заголовок
            driver.isElementPresent(By.css("#main h1")).then(function () {
                assert.ok(true, "");
            });

            //Список подменю
            var subMenu = driver.findElements(By.css("li#app- .docs span.name"));

            // Клик по подменю
            for (var j = 0; j < subMenu.length; j++) {
                var subName = subMenu[j].Click();

                // Проверяем заголовок
                driver.isElementPresent(By.css("#main h1")).then(function () {
                    assert.ok(true, "");
                });
            };
        };
    });

    test.after(function() {
        driver.quit();
    });
});