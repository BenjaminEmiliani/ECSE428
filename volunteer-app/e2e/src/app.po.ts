import { browser, by, element, protractor } from 'protractor';
import {Volunteer} from "../../src/app/model/volunteer"


export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
   
  }

  // async newName(name: string): Promise<void> {
 
  //   var input = element(by.id('nameInput'));
  //   input.sendKeys(name);  
  //   var btn = element(by.css(".update-button"));  
  //   browser.sleep(500);
  //   btn.click();
  //   btn.click();
  // }

  // async getUsername(): Promise<string> {
  //   return element(by.id('username')).getText();
  // }


  
  async createAllVolenteerFeilds(): Promise<Object> {

    let volunteer: any;
    volunteer = new Volunteer();
    volunteer.first_name = "Harry";
    volunteer.last_name = "Potter";
    volunteer.email = "harry.pot@gmail.com";
    volunteer.password = "1234abcd";
    volunteer.phone_number = "5146640022";
    volunteer.dob = "02/12/2021";
    volunteer.major = "Software Engineering";
    volunteer.year = "U1";

    return volunteer;
  }

  
}
