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
var $q=require('q');

test.describe('Регистрация пользователя', function() {
    var driver; var email; var password;

    var getRandomNumber = function () {
        var n=100; var m=1000;
        return Math.floor(Math.random( ) * (n - m + 1)) + m
    };
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

    test.it('Регистрируемся', function() {

        var inputField;
        var number =getRandomNumber();
        var firstname = "Marina";
        var lastname = "Tolmacheva" + number;
        email = "emailUser"+number+"@list.ru";
        password = lastname;

        driver.findElement(By.linkText("New customers click here")).click().then(
            (click)=> {
                driver.findElement(By.name("firstname")).sendKeys(firstname + Key.TAB
                    + lastname + Key.TAB + "100 let Vladivostoky" + Key.TAB + "Davydova" + Key.TAB
                    + "69006" + Key.TAB + "Vladivostok" + Key.TAB + "United States"
                    + Key.TAB + email + Key.TAB + "+7 914 123 98 70" + Key.TAB
                    + password + Key.TAB + password).then(()=>

                driver.findElement(By.css("select[name = 'country_code']")).getAttribute("value")
                    .then((text) =>{
                        if (text == "US") {
                            var selectElem = driver.findElement(By.css("select[name = 'zone_code']"));
                            selectElem.click();
                            selectElem.findElement(By.css("option[value='AK']")).click();
                        }
                    })).then(()=>
                driver.findElement(By.css("input[name='newsletter']")).getAttribute("value")
                    .then((text) =>{
                        if (text == "1") {
                            driver.findElement(By.css("input[name='newsletter']")).click();
                        }
                    })).then(()=>

                driver.findElement(By.css("button[name='create_account']")).click()).then(()=>

                driver.wait(driver.findElement(By.linkText("Logout")).click(),1000));
            }
        );
    });

    test.it('Авторизация', function () {

            driver.findElement(By.name("email")).sendKeys(email).then(()=>
            driver.findElement(By.name("password")).sendKeys(password)).then(()=>
            driver.wait(driver.findElement(By.css("button[name = 'login'")).click(), 1000)).then(()=>

            driver.wait(driver.findElement(By.linkText("Logout")).click(), 1000));
    });

});