import { Before, Given, Then, When, And } from 'cucumber';
import { expect, assert } from 'chai';
import { AppPage } from '../app.po';
import { browser, by, element, protractor } from 'protractor';
import { Selector } from 'testcafe';



let page: AppPage;
let email = "sh@gmail.com";
let password = "abcd1234";

var volSelect;
var volOption;

var eventSelect;
var eventOption;

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


When(/^I select myself for registration$/, async () => {
  element(by.cssContainingText('option', 'sami hilal')).click();
});


When(/^I select Science Fair for registration$/, async () => {
  element(by.cssContainingText('option', 'ScienceFair')).click();
  var registerBtn = element(by.id('submit-button'));
  await registerBtn.click();
  await sleep(1000);
});


When(/^I request to unregister the event$/, async () => {
  browser.navigate().refresh();
  element(by.id('unreg-event-id')).element(by.cssContainingText('option', 'ScienceFair')).click();
  var unregisterBtn = element(by.id('unreg-submit-button'));
  await unregisterBtn.click();
  await sleep(1000);
});

Then(/^I wont be registered to the event$/, async () => {
  await browser.navigate().refresh();
  await sleep(2000);
  var exists;
  const elem = element(by.id('unreg-event-id')).element(by.cssContainingText('option', 'ScienceFair'));
  if(await elem.isPresent()) {
    exists = true;
  } else {
    exists = false;
  }
  expect(exists).to.equal(false);
  await sleep(1000);
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