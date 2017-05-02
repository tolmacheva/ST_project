// Задание 4
// Создать сценарий проверки учебного приложения

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Check Admin Login in', function() {
    var driver;

    test.before(function() {
      //driver = new webdriver.Builder().forBrowser('chrome').build();
      //driver = new webdriver.Builder().forBrowser('ie').build();
      //driver = new webdriver.Builder().forBrowser('firefox').build();

        driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismis'})
            .forBrowser('chrome')
            .build();
        driver.getCapabilities().then(function(caps) {
            console.log(caps);
        });

        driver.manage().deleteCookie("test");
        driver.manage().deleteAllCookies();


    });

    test.it('should append query to title', function() {

       driver.get('http://localhost/litecart/admin/');
       // driver.findElement(By.css("img[alt='My Store']"));
       // driver.findElement(By.css("a[href='http://localhost/litecart/en/']"));
       // driver.findElement(By.name('username')).sendKeys('admin');
        //driver.findElement(By.name('password')).sendKeys('admin');
       // driver.findElement(By.name('remember_me')).click();
       // driver.findElement(By.xpath("//button[@name='login']")).click();
       // driver.wait(until.titleIs('My Store'), 1000);
    });

    test.after(function() {
       driver.quit();
    });
});