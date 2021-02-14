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

  async getEventCreation(): Promise<string> {
    browser.sleep(10000).then(function() {
      alert('waited 10 seconds');
    });
    return element(by.id('check')).getText();
  }


  async newEvent(name: string, category: string, date: string, sTime: string, eTime: string): Promise<void> {
    var inputName = element(by.xpath('/html/body/app-root/app-create-event/div/div/div/form/div[1]/input'));
    inputName.sendKeys(name);  

    var inputCategory = element(by.xpath('/html/body/app-root/app-create-event/div/div/div/form/div[2]/input'));
    inputCategory.sendKeys(category);

    var inputDate = element(by.xpath('/html/body/app-root/app-create-event/div/div/div/form/div[3]/input'));
    inputDate.sendKeys(date);  

    var inputSTime = element(by.xpath('/html/body/app-root/app-create-event/div/div/div/form/div[4]/input'));
    inputSTime.sendKeys(date);  

    var inputETime = element(by.xpath('/html/body/app-root/app-create-event/div/div/div/form/div[5]/input'));
    inputETime.sendKeys(sTime);  

    var btn = element(by.xpath('/html/body/app-root/app-create-event/div/div/div/form/div[7]/button'));  
    await browser.sleep(500);

    btn.click();
    btn.click();

    
    
    
  }
}
