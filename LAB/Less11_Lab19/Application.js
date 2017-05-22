/**
 * Приложение
 */

var webdriver = require('selenium-webdriver');
var mainPage = require('./MainPage');
var productPage = require('./ProductPage');
var basketPage = require('./BasketPage');

class Application {

    constructor() {
        this.driver = new webdriver.Builder()
            .withCapabilities({'unexpectedAlertBehaviour': 'dismiss'})
            .forBrowser('chrome')
            .build();

        this.mainPage = new mainPage.MainPage(this.driver);
        this.productPage = new productPage.ProductPage(this.driver);
        this.basketPage = new basketPage.BasketPage(this.driver);
    }

    quit() {
        this.driver.quit();
    }

    getTabByName(tabName) {
        this.mainPage.open().getTabByName(tabName);
    }

    ignoreOpenProductPage(tabName, number) {
        this.mainPage.open();
        this.mainPage.getTabByName(tabName);
        this.mainPage.chooseProductOnTabByNumber(tabName, number);
        this.productPage.backHome();
    }

    chooseProduct(tabName, number) {
        this.mainPage.chooseProductOnTabByNumber(tabName, number);
    }

    chooseSizeProductAndPutInBasket(size) {
        this.mainPage.enterSize(size);
        this.mainPage.submitBuy();
    }

    checkProductInBasket(count) {
        this.mainPage.checkBasket(count);
        this.mainPage.backHome();
    }

    deleteProductsInBasket() {
        this.mainPage.getBasket().then((basket)=>{
            basket.click().then(()=> {
                this.driver.manage().timeouts().implicitlyWait(1000);
                this.basketPage.deleteProductAndCheckSummary()
            });
        });
    }
}

exports.Application = Application;