// Задание 14
// Войти на страницу http://localhost/litecart/admin
// Зайти в меню Страны кликнуть по ссылке, которая открывает новое окно
// Переключиться в новое окно, закрыть его и вернуться обратно


var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var By = webdriver.By;
var until = webdriver.until;
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var Key = webdriver.Key;
var $q = require('q');
var path = require('path')

var userName = 'admin',
    password = 'admin';

test.describe('Регистрация пользователя', function() {
    var driver;
    var product = "Yellow duck with ducklings"

    test.before(function() {
        driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismiss'})
            .forBrowser('chrome')
            .build();

        driver.get('http://localhost/litecart/admin/');
        driver.findElement(By.name('username')).sendKeys(userName);
        driver.findElement(By.name('password')).sendKeys(password);
        driver.findElement(By.xpath("//button[@name='login']")).click();
        driver.manage().timeouts().implicitlyWait(10000);
    });

    test.after(function() {
        driver.quit();
    });

    var getNewWindow = function (curWindow) {
        return driver.getAllWindowHandles().then((items) => {
            return items.find(window => window != curWindow);
        });
    };


    test.it('Проход по внешним ссылкам', function() {

        driver.findElement(By.linkText("Countries")).click();
        driver.findElement(By.linkText("Add New Country")).click();

        var curWindow;

        driver.getWindowHandle().then((idWindow) => {
            curWindow=idWindow;
        });

        var arrlincks = [];
        driver.findElements(By.css("a i.fa-external-link")).then(function (exLinks) {
            exLinks.map((curLink) => {
                arrlincks.push(curLink.click().then(
                    (click) => {
                        getNewWindow(curWindow).then((newWindow)=>{
                            if (newWindow != null) {
                            driver.switchTo().window(newWindow);
                            driver.wait(until.elementLocated(By.tagName('title')), 10000/*ms*/).then(() =>{
                                driver.close();
                                driver.switchTo().window(curWindow);
                            })
                        }})
                    },
                    (err) => {
                        return false;
                    }
                    )
                );
            });
            $q.all(arrlincks);
        });
    });

});