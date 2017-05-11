// Задание 9
// Войти на страницу http://localhost/litecart/admin/?app=countries&doc=countries
// Проверить, что страны расположены в алфавитном порядке
// Для для тех стран, у которых количество зон отлично от нуля -- открыть страницу этой страны
// и там проверить, что зоны расположены в алфавитном порядке

// Войти на страницу http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones
// Зайти в каждую из стран и проверить, что зоны расположены в алфавитном порядке

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
        driver.findElement(By.name('username')).sendKeys(userName);
        driver.findElement(By.name('password')).sendKeys(password);
        driver.findElement(By.xpath("//button[@name='login']")).click();
        driver.manage().timeouts().implicitlyWait(10000);
    });

    test.after(function () {
        driver.quit();
    });


    test.it('Проверяем порядок стран', function () {

        driver.findElement(By.linkText("Countries")).click();

        driver.findElements(By.xpath("//*[@id='main']/form[@name ='countries_form']/table/tbody/tr/td[5]/a")).then(function (countries) {
            i = 1;
            var countiesForEach = [];
            var prevCountryName = "";
            countries.map(function (elem) {

                var path1 = "//*[@id='main']/form[@name ='countries_form']/table/tbody/tr[" + i + "]/td[5]/a";
                var path2 = "//*[@id='main']/form/table/tbody/tr[" + i + "]/td[6]";
                var prevStateName = "";

                countiesForEach.push(
                    driver.findElement(By.xpath(path1)).then(function (country) {

                        country.getAttribute("textContent").then(function (curCountryName) {

                            if (prevCountryName.localeCompare(curCountryName) == -1) {
                                prevCountryName = curCountryName;
                            }
                            else console.log(curCountryName + " - Error");

                            driver.findElement(By.xpath(path2)).getAttribute("textContent").then(function (countZone) {
                                if (countZone > 0) {
                                    country.click().then(
                                        function (click) {
                                            driver.manage().timeouts().implicitlyWait(1000);
                                            driver.findElements(By.xpath("//*[@id='main']/form/table/tbody/tr/td[3]/input[@name=contains(text(),zone)]"))
                                                .then(function (zoneNames) {
                                                    var arrZoneNames = [];
                                                    zoneNames.map(function (curZone) {
                                                        arrZoneNames.push(
                                                            curZone.getAttribute("value").then(function (zoneName) {
                                                                if (prevStateName.localeCompare(zoneName) == -1)
                                                                    prevStateName = zoneName;
                                                                else console.log(zoneName + " - Error");
                                                            })
                                                        );
                                                    })
                                                    $q.all(arrZoneNames);
                                                });
                                            driver.wait(function () {
                                                driver.findElement(By.css("button.btn[name='cancel']")).click();
                                            }, 1000)
                                            return true;
                                        },
                                        function (err) {
                                            return err;
                                        }
                                    )
                                }
                            });
                        })
                    })
                );
                i++;
            });
            $q.all(countiesForEach)
        });
    });


    test.it("Проверяем зоны", function () {

        driver.findElement(By.linkText("Geo Zones")).click();
        driver.findElements(By.xpath("//*[@id='main']/form/table/tbody/tr/td[3]/a"))
            .then(function (zones) {
                var arrZones = [];
                i=1;
                zones.map(function (elem) {

                    var path1= "//*[@id='main']/form/table/tbody/tr[" + i + "]/td[3]/a";
                    var path2 = "//*[@id='main']/form/table/tbody/tr/td[3]";

                    arrZones.push(
                    driver.findElement(By.xpath(path1))
                        .then(function (curZone) {
                            curZone.click().then(
                                function (click) {
                                    driver.manage().timeouts().implicitlyWait(1000);

                                    var arrZoneNames = [];
                                    var prevStateName = "";
                                    driver.findElements(By.xpath(path2)).then(function (zoneNames) {
                                        zoneNames.map(function (curZoneName) {
                                            arrZoneNames.push(
                                                curZoneName.getAttribute("textContent").then(function (name) {
                                                    if (prevStateName.localeCompare(name) == -1)
                                                        prevStateName = name;
                                                    else console.log(curZoneName, "Error");
                                                })
                                            );
                                        });
                                        $q(arrZoneNames);
                                    });
                                    driver.wait(function () {
                                        driver.findElement(By.css("button.btn[name='cancel']")).click();
                                    }, 1000);
                                    return true;
                                },
                                function (err) {
                                    return false;
                                }
                            )
                        })
                    );
                    i++;
                });
                $q.all(arrZones);
            });
    });
});