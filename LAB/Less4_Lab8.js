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
var linlkLength,  stickLength;

test.describe('Check Main Left menu', function() {
    var driver;
    //var linlkLength,  stickLength;

    test.before(function() {
        driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismiss'})
            .forBrowser('chrome')
            .build();

        driver.get('http://localhost/litecart/');
        driver.manage().timeouts().implicitlyWait(10000/*ms*/);

    });

/*
    test.it('Проверяем', function() {
        driver.findElements(By.css("#content > ul > li > a")).then(function (tabElems) {
            var j=1;
            for (i = 0; i < tabElems.length; i++)
            {
                var path1 = "//div[@class='tab-content']/div[" + j + "]//a";
                console.log(path1, "path1");
                var path2 = "//div[@class='tab-content']/div[" + j + "]//a//div[contains(@class, 'sticker')]";
                console.log(path2, "path2");
 driver.manage().timeouts().implicitlyWait(10000/!*ms*!/);
 linlkLength = driver.findElements(By.xpath(path1)).length;
 driver.manage().timeouts().implicitlyWait(10000/!*ms*!/);
 stickLength = driver.findElements(By.xpath(path2)).length;
 driver.manage().timeouts().implicitlyWait(10000/!*ms*!/);
                tabElems[i].click();


                console.log(linlkLength, "linlkLength");
                console.log(stickLength, "stickLength");
                j++;
            }
        });
    });
*/

    test.it('Проверяем', function() {
        driver.findElements(By.css("#content > ul > li > a")).then(function (tabElems) {
            i=1;
            tabElems.forEach(function (elemTab) {
                
                var path1 = "//div[@class='tab-content']/div[" + i + "]//a";
                var path2 = "//div[@class='tab-content']/div[" + i + "]//a//div[contains(@class, 'sticker')]";

                elemTab.click();
                driver.manage().timeouts().implicitlyWait(5000/*ms*/);
                driver.findElement(By.css("#content > ul > li.active > a")).then(function (elem) {
                    return elem.getAttribute("hash");
                }).then(function (elem) {
                    driver.manage().timeouts().implicitlyWait(5000/*ms*/);
                    driver.findElements(By.xpath(path1)).then(function (elLinks) {
                        return linlkLength = elLinks.length;
                    }).then(function (elem) {
                        driver.manage().timeouts().implicitlyWait(5000/*ms*/);
                        driver.findElements(By.xpath(path2)).then(function (elSticks) {
                            return stickLength = elSticks.length;
                        })
                    }).then(function () {
                        assert.equal(linlkLength,stickLength);
                        //console.log(linlkLength, "linlkLength")
                        //console.log(stickLength, "stickLength");

                    });
                });
                //assert.equal(linlkLength,stickLength);
                i++
/*
                console.log(linlkLength, "linlkLength")
                console.log(stickLength, "stickLength");
*/
            });
        });
    });

    test.after(function() {
        driver.quit();
    });
});