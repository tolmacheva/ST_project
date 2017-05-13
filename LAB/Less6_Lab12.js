// Задание 12
// Войти на страницу http://localhost/litecart/admin
// Зайти в меню Каталог и добавить новый товар


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

    test.it('Добавляем товар', function() {

        var ROOT = __dirname;
        var inputField;
        var image = "./674.jpg";

        var filePath = path.normalize(path.join(ROOT,image));

        driver.findElement(By.linkText("Catalog")).click();

        driver.findElement(By.css("#main > ul > li:nth-child(3) > a")).click();
        driver.manage().timeouts().implicitlyWait(10000);

        // Вкладка General
        driver.findElement(By.linkText("General")).click();

        driver.findElement(By.xpath("//*[@id='tab-general']/div/div[1]/div[1]/div/div/label[1]")).click();

        driver.findElement(By.css("#category-id-0")).isSelected().then(function(selectedRoot){
            if (!selectedRoot){
                driver.findElement(By.css("#category-id-0")).click();
            }
        });

        driver.findElement(By.css("#category-id-0 label > input[type='checkbox']")).isSelected()
            .then(function(selectRubberDucks){
                if (selectRubberDucks) {
                    inputField = driver.findElement(By.css("#category-id-0 label > input[type='checkbox']"));
                    driver.executeScript("arguments[0].value =1", inputField);
                }
            });

        if(!driver.findElement(By.css("#tab-general > div > div:nth-child(1) > div:nth-child(3) > select")).isSelected())
        {driver.findElement(By.css("#tab-general > div > div:nth-child(1) > div:nth-child(3) > select")).click();}

        driver.findElement(By.css("#tab-general > div > div:nth-child(1) > div:nth-child(3) > select")).sendKeys("Rubber Ducks");
        driver.findElement(By.css("#tab-general > div > div:nth-child(1) > div:nth-child(4) > div > div > div:nth-child(4) > label > input[type='checkbox']")).click();

        inputField = driver.findElement(By.css("#tab-general > div > div:nth-child(1) > div:nth-child(5) > input"));
        driver.executeScript("arguments[0].value ='2017-05-12'", inputField);
        inputField = driver.findElement(By.css("#tab-general > div > div:nth-child(1) > div:nth-child(6) > input"));
        driver.executeScript("arguments[0].value ='2017-07-12'", inputField);


        driver.findElement(By.css("#tab-general > div > div:nth-child(2) > div:nth-child(1) > input[name ='code']")).sendKeys("rd004");
        driver.findElement(By.css("#tab-general > div > div:nth-child(2) > div:nth-child(2) > div > input"))
            .sendKeys(product);
        driver.findElement(By.css("#tab-general > div > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > input")).sendKeys("RD004");

        driver.findElement(By.css("#tab-general > div > div:nth-child(2) > div:nth-child(4) > div > div:nth-child(1) > input")).clear();
        driver.findElement(By.css("#tab-general > div > div:nth-child(2) > div:nth-child(4) > div > div:nth-child(1) > input")).sendKeys("5");
        driver.findElement(By.css("#tab-general > div > div:nth-child(2) > div:nth-child(4) > div > div:nth-child(2) > select")).click();

        driver.findElement(By.css("select[name='quantity_unit_id']")).click();
        driver.findElement(By.css("select[name='quantity_unit_id'] > option[value = '1']")).click();

        inputField = driver.findElement(By.css("#tab-general > div > div:nth-child(2) > div:nth-child(5) > div > input"));
        driver.executeScript("arguments[0].setAttribute('value', '200' )", inputField);

        inputField = driver.findElement(By.css("select[name='weight_class']"));
        driver.executeScript("arguments[0].value ='g'", inputField);

        inputField = driver.findElement(By.css("input[name='dim_x']"))
        driver.executeScript("arguments[0].setAttribute('value', '170' )", inputField);
        inputField = driver.findElement(By.css("input[name='dim_y']"))
        driver.executeScript("arguments[0].setAttribute('value', '100' )", inputField);
        inputField = driver.findElement(By.css("input[name='dim_z']"));
        driver.executeScript("arguments[0].setAttribute('value', '100' )", inputField);

        inputField = driver.findElement(By.css("select[name='dim_class']"));
        driver.executeScript("arguments[0].value ='mm'", inputField);

        driver.findElement(By.css("#tab-general > div > div:nth-child(2) > div:nth-child(7) > select")).click();
        driver.findElement(By.css("select[name='quantity_unit_id'] > option[value = '1']")).click();

        driver.findElement(By.css("#tab-general > div > div:nth-child(2) > div:nth-child(7) > select")).click();
        driver.findElement(By.css("#tab-general > div > div:nth-child(2) > div:nth-child(7) > select > option:nth-child(1)")).click();
        driver.findElement(By.css("#tab-general > div > div:nth-child(2) > div:nth-child(8) > select")).click();
        driver.findElement(By.css("#tab-general > div > div:nth-child(2) > div:nth-child(8) > select > option:nth-child(1)")).click();

        driver.findElement(By.css("#images > div.new-images > div > div.input-group > input")).sendKeys(filePath);

        // Вкладка Information
        driver.wait(driver.findElement(By.linkText("Information")).click(), 1000);

        inputField = driver.findElement(By.css("select[name='manufacturer_id']"));
        driver.executeScript("arguments[0].value =''", inputField);

        inputField = driver.findElement(By.css("select[name='supplier_id']"));
        driver.executeScript("arguments[0].value =''", inputField);


        driver.findElement(By.css("#tab-information > div:nth-child(3) > div > div > input")).sendKeys("Rubber duck for a bath");

        driver.findElement(By.css("#tab-information > div:nth-child(4) > div > div > div > div.trumbowyg-editor"))
            .sendKeys("<p>Toys detailed have relief items: tails, wings, perky forelocks.<br>" +Key.ARROW_DOWN +
                "They have expressive eyes and bright beak. The big duck is decorated with flourishes</p>")

        driver.findElement(By.css("#tab-information > div:nth-child(5) > div > div > textarea"))
            .sendKeys("Colors" + Key.ENTER + "Body: Yellow" + Key.ENTER + "Eyes: Black"
                + Key.ENTER + "Beak: Orange" + Key.ENTER + Key.ENTER + "Other" + Key.ENTER + "PVC-plastisol");


        // Вкладка Price
        driver.wait(driver.findElement(By.linkText("Prices")).click(), 1000);

        inputField = driver.findElement(By.css("#prices > div > div:nth-child(1) > div > input"));
        driver.executeScript("arguments[0].value ='5.99'", inputField);
        inputField = driver.findElement(By.css("#prices > div > div:nth-child(1) > div > select"));
        driver.executeScript("arguments[0].value ='EUR'", inputField);

        inputField = driver.findElement(By.css("#prices > table > tbody > tr:nth-child(2) > td:nth-child(1) > div > input"));
        driver.executeScript("arguments[0].value ='6.99'", inputField);

        driver.wait(driver.findElement(By.css("button[name='save']")).click(), 1000);


    });

    test.it('Проверяем товар в каталоге', function () {

        driver.findElement(By.linkText("Catalog")).click();

        driver.wait(driver.findElement(By.linkText("Rubber Ducks")).click(), 1000);

        driver.findElements(By.css("#main > form > table > tbody > tr > td:nth-child(3) >a"))
            .then(function (elems) {
                var arrNames =[];
                elems.map(function (elem) {
                    arrNames.push(elem.getAttribute("textContent").then((text) => {
                        if (text.localeCompare(product) == 0) {
                            assert.ok(product, "Добавлен в каталог");
                        }
                    }));
                });
                $q.all(arrNames);
            });
    });

});