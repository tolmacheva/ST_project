/**
 * Задание 19
 */

var test = require('selenium-webdriver/testing');
var tagert = require('./Application');

test.describe('Последовательно добавить продукт в корзину, а затем по одному удалить', function() {
    var аpp;
    var tabName = "Campaign Products";

    test.before(function () {
        аpp = new tagert.Application();
    });

    test.after(function () {
        аpp.quit();
    });

    test.it('Test', function () {
        var sizeProduct = ["Small"]; //, "Medium", "Large"
        var i=1;

        аpp.ignoreOpenProductPage(tabName, 1);

        sizeProduct.map((curElem)=>{
            аpp.chooseProduct(tabName, 1);
            аpp.chooseSizeProductAndPutInBasket(curElem);
            аpp.checkProductInBasket(i);
            i++;
        });

        //аpp.deleteProductsInBasket();
    });
});