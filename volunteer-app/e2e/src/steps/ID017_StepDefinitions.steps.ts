import { Before, Given, Then, When } from 'cucumber';
import { expect, assert } from 'chai';
import { AppPage } from '../app.po';
import { browser, by, element, protractor } from 'protractor';


let page: AppPage;
let email = "sh@gmail.com";
let password = "abcd1234";

Before(() => {
  page = new AppPage();
});

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

Given(/^I am logged in as a Volunteer$/, async () => {
  await browser.get(browser.baseUrl + "/login");
  var emailInput = element(by.id('emailLogin'));
  var passwordInput = element(by.id('passwordLogin'));
  var loginButton = element(by.id('loginbtn'));

  emailInput.sendKeys(email);
  passwordInput.sendKeys(password);

  await sleep(1000);

  loginButton.click();

  await sleep(1500);

});

When(/^I request to unregister without selecting an event$/, async () => {
  
  var unregisterBtn = element(by.xpath('/html/body/app-root/app-homepage/app-volunteer-unregister-event/form/button'));
  await unregisterBtn.click();

  await sleep(1000);
});

Then(/^an error message is issued$/, async () => {
  var errormsg = await element(by.xpath('/html/body/app-root/app-homepage/app-volunteer-unregister-event/form/div[1]/div')).getText();
  expect("*required").to.equal(errormsg);
});