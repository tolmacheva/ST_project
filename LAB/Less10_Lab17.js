// Задание 17
// Войти на страницу http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1
// Проверить не появляются ли в логе браузера сообщения при открытии страниц в учебном приложении,
// Последовательно открывать страницы товаров и проверять, не появляются ли в логе браузера сообщения (любого уровня)


var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var By = webdriver.By;
var until = webdriver.until;
var test = require('selenium-webdriver/testing');
var $q = require('q');

var userName = 'admin',
    password = 'admin';

function ChackCountries(name) {
}
test.describe('Check ', function () {
    var driver;

    test.before(function () {

        var options = new chrome.Options();
        driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismiss'})
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        driver.get('http://localhost/litecart/admin/');
        driver.manage().timeouts().implicitlyWait(10000);
        driver.findElement(By.name('username')).sendKeys(userName);
        driver.findElement(By.name('password')).sendKeys(password);
        driver.findElement(By.xpath("//button[@name='login']")).click();
    });

    test.after(function () {
        driver.quit();
    });

    test.it('Проверяем порядок стран', function () {

        driver.findElement(By.linkText("Catalog")).click();
        driver.wait(driver.findElement(By.linkText("Rubber Ducks")).click(), 1000);
        driver.findElements(By.xpath("//a[contains(text(),'Duck')]"))
            .then((listProducts) => {
                var arr = [];
                var i = 1;
                listProducts.map((curProduct) => {
                    arr.push(
                        driver.findElements(By.xpath("//a[contains(text(),'Duck')]"))
                            .then((products) => {
                                products[i].click().then((prodClick) => {
                                    driver.manage().logs().get( "browser" ).then(function( logsEntries ) {
                                        logsEntries.forEach( (item) => {
                                            console.log(item);
                                        });
                                        driver.findElement(By.css("button[name='cancel']")).click();
                                    });
                                });
                                i++;

                            }));

                });
                $q.all(arr);
            });
    });
});
