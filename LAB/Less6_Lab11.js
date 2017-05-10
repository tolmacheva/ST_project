// Задание 11
// Войти на главную страницу http://localhost/litecart
// Зарегистрировать нового пользователя
// Выйти - Logout
// Авторизоваться пользователем и выйти

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var By = webdriver.By;
var until = webdriver.until;
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var Key = webdriver.Key;


test.describe('Регистрация пользователя', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismiss'})
            .forBrowser('chrome')
            .build();

        driver.get('http://localhost/litecart/');
        driver.manage().timeouts().implicitlyWait(10000/*ms*/);

    });


    test.it('Регистрируемся', function() {

        driver.findElement(By.css("#box-account-login > form > p > a")).click().then(
            function (click) {

                driver.findElement(By.name("firstname")).sendKeys("Marina" + Key.TAB
                    + "Tolmacheva" + Key.TAB + "100 let Vladivostoky" + Key.TAB + "Davydova" + Key.TAB
                    + "69006" + Key.TAB + "Vladivostok" + Key.TAB + "United States"
                    + Key.TAB + "tolmacheva@list.ru" + Key.TAB + "+7 914 123 98 70" + Key.TAB
                    + "1234" + Key.TAB + "1234" + Key.TAB);
                driver.sleep(1000);

                driver.findElement(By.css("#box-create-account > form select[name = 'country_code']")).getAttribute("value")
                    .then(function (text) {
                        if (text = "US") {
                            driver.findElement(By.css("#box-create-account > form select[name = 'zone_code']")).click();
                            driver.sleep(1000);
                            driver.findElement(By.css("#box-create-account > form select[name = 'zone_code']"))
                                    .sendKeys("Alaska" + Key.ENTER);
                        }
                    });

                driver.findElement(By.css("#box-create-account > form input[name='newsletter']")).getAttribute("value")
                    .then(function (text) {
                        if (text = "1") {
                            driver.findElement(By.css("#box-create-account > form input[name='newsletter']")).click();
                            driver.sleep(500);
                        }
                    })
            });


        driver.findElement(By.css("#box-create-account > form button[name='create_account']")).click();

        driver.findElement(By.linkText("Logout")).click();

    });


    test.it('Авторизация', function () {


            driver.findElement(By.name("email")).sendKeys("tolmacheva2@list.ru" + Key.ENTER);
            driver.findElement(By.name("password")).sendKeys("1234" + Key.ENTER);

            driver.wait(function () {
                driver.findElement(By.css("button[name = 'login'")).click();
            }, 1000).then(
            function (click) {
                driver.sleep(1000);
                driver.findElement(By.linkText("Logout")).click();
                return true;
            },
            function (err) {
                return false;
            }
        );
    })

    test.after(function() {
        driver.quit();
    });
});