import { By, until, WebDriver } from "selenium-webdriver";

export class SpecPage{

    driver: WebDriver;
    url: string = "https://www.google.com/";

    //locators
    headerLogo: By = By.css(".lnXdpd");
    searchInput: By = By.name("q");
    results: By = By.css('div[id="rso"]');

    constructor (driver: WebDriver){
        this.driver = driver;
    }

    async navigate(){
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.headerLogo));
        await this.driver.wait(
            until.elementIsVisible(await this.driver.findElement(this.headerLogo))
        );
    }

    async doSearch(searchTerm: string) {
        await this.driver.wait(until.elementLocated(this.searchInput));
        await this.driver.findElement(this.searchInput).sendKeys(`${searchTerm}\n`);
        await this.driver.wait(until.elementLocated(this.results));
    }

    async getResults() : Promise<string> {
        await this.driver.wait(until.elementLocated(this.results));
        return (await this.driver.findElement(this.results)).getText();
    }
}