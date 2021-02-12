import { browser, by, element, protractor } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
   
  }

  async newName(name: string): Promise<void> {
 
    var input = element(by.id('nameInput'));
    input.sendKeys(name);  
    var btn = element(by.css(".update-button"));  
    browser.sleep(500);
    btn.click();
    btn.click();
  }

  async getUsername(): Promise<string> {
    return element(by.id('username')).getText();
  }
}
