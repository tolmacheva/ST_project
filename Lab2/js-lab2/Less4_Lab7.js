// Задание 7
// входит в панель администратора http://localhost/litecart/admin
// прокликивает последовательно все пункты меню слева, включая вложенные пункты
// для каждой страницы проверяет наличие заголовка (то есть элемента с тегом h1)

var webdriver = require('selenium-webdriver'),
    //chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

var userName = 'admin',
    password = 'admin';

/*
var MenuClick = function MenuClick(driver, nameMenu)
{
    driver.FindElement(By.XPath("//a[span[.='{name}']]")).Click();
    driver.FindElement(By.XPath("//li[a[span[.='{name}']]][@class='selected']"));
};

var MenuSub = function GetSubmenusName(driver, nameMenu)
{
    driver.manage().timeouts().implicitlyWait(10000/!*ms*!/);
    var menus = driver.FindElements(By.XPath("//li[a[span[.='{name}']]]//li"));
    driver.manage().timeouts().implicitlyWait(10000/!*ms*!/);
    return menus;
};
*/


test.describe('Check Main Left menu', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismiss'})
            .forBrowser('chrome')
            .build();

    });

    test.it('Проверяем', function() {

         driver.get('http://localhost/litecart/admin/');
         driver.findElement(By.name('username')).sendKeys(userName);
         driver.findElement(By.name('password')).sendKeys(password);
         driver.findElement(By.xpath("//button[@name='login']")).click();

        var menus = driver.findElements(By.css("ul#box-apps-menu .name")).;

        for (var i = 0; i < menus.length; i++) {
            var name = menus[i].textContent;
            MenuClick(driver, name);
            driver.manage().timeouts().implicitlyWait(10000/!*ms*!/);
            var menuSub = this.MenuSub(driver,name)
            for (var j = 0; j < menuSub.length; j++) {
                MenuClick(driver, menuSub[j].textContent);
            }
        }
    });

    test.after(function() {
        //driver.quit();
    });
});