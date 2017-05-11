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
var $q = require('q');

var userName = 'admin',
    password = 'admin';


test.describe('Check Main Left menu', function () {
    var driver;

    test.before(function () {

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

    test.after(function () {
        driver.quit();
    });

    test.it('Проверяем', function () {

        // Список меню
        driver.findElements(By.css("#app- span.fa-lg")).then(function (elemMenus) {
            var i = 0;
            var arrMenuClicks = [];

            elemMenus.map(function (curElem) {
                arrMenuClicks.push(
                    driver.findElements(By.css("#app- span.fa-lg")).then(function (mainMenus) {
                        mainMenus[i].click()
                            .then(function (click) {
                                    driver.sleep(500);
                                    driver.findElement(By.css("h1")).getText().then(function (text) {
                                        assert.ok( text.length>0, "Заголовок есть")
                                    });
                                    driver.findElements(By.css("#app-.selected .docs a"))
                                        .then((subElems) => {
                                            var arrSubMenuClicks = [];
                                            var j = 0;
                                            subElems.map(function (curSubElem) {
                                                arrSubMenuClicks.push(
                                                    driver.findElements(By.css("#app-.selected .docs a"))
                                                        .then(function (subMenus) {
                                                            subMenus[j++].click().then(function (click) {
                                                                driver.findElement(By.css("h1")).getText().then(function (text) {
                                                                    assert.ok( text.length>0, "Заголовок есть")
                                                                });
                                                            })
                                                        })
                                                );
                                            });
                                            $q.all(arrSubMenuClicks);
                                        });
                                },
                                function (err) {
                                    return false;
                                })
                        i++
                    })
                )
            })
            $q.all(arrMenuClicks);
        });
    });
});
