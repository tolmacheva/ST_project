/**
 * Главная страница
 */

var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;

class MainPage {


    constructor (driver) {
        this.driver = driver;
    }

    open()
    {
        this.driver.get('http://localhost/litecart/');
        return this;
    }

    putProductInBasket(tabName)
    {
        getTabByName(tabName);

    }

    getTabByName(tabName)
    {
        this.driver.findElement(By.linkText(tabName)).click();
    }

    chooseProductOnTabByNumber(tabName,i)
    {
        switch (tabName)
        {
            case "Campaign Products":
                this.driver.findElements(By.xpath("//*[@id='campaign-products']//a")).then
                ((products) =>{
                    products[i-1].click();
                    this.driver.wait(until.elementLocated(By.id("box-product")));
                });
                break;
        }
    }

    enterSize(size)
    {
        var selectElem = this.driver.findElement(By.css("select[name = 'options[Size]']"));
        selectElem.click().then((click)=>{
        selectElem.findElement(By.css("option[value="+size+"]")).click();
        });
    }

    submitBuy()
    {
        this.driver.findElement(By.xpath("//*[@name = 'add_cart_product']")).click();
    }

    checkBasket(count){
        this.driver.wait(until.elementTextContains(this.driver.findElement(By.css("#cart span.quantity")), count));
    }

    backHome(){
        this.driver.findElement(By.linkText("Home")).click();
    }

}

exports.MainPage = MainPage;