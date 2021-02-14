
import { Before, Given, Then, When } from 'cucumber';
import { expect, assert } from 'chai';
import { AppPage } from '../app.po';
import {Volunteer} from "../../../src/app/model/volunteer"
import { browser, by, element, protractor } from 'protractor';



// 1) Scenario: (Normal Flow) I succesfully create a volunteer account with valid email, password, name and provide extra profile details.


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


Given(/^I am on volunteer signup page$/, async () => {

    return browser.get(browser.baseUrl);
  });


When(/^I enter my email, password, first name, last name$/,async () => {

    var firstName = element(by.id('firstName'));
    firstName.sendKeys("Harry");

    await sleep(1000);

    var lastName = element(by.id('lastName'));
    lastName.sendKeys("Potter");

    await sleep(1000);

    var emailAddress = element(by.id('emailAddress'));
    emailAddress.sendKeys("harry.pot@gmail.com");

    await sleep(1000);

    var password = element(by.id('password'));
    password.sendKeys("1234abcd"); 

  });


When(/^I enter extra profile details$/,async () => {

    var phoneNumber = element(by.id('phoneNumber'));
    phoneNumber.sendKeys("5146640022");

    await sleep(1000);

    var dob = element(by.id('dob'));
    dob.sendKeys("02/12/2021");

    await sleep(1000);

    var major = element(by.id('major'));
    major.sendKeys("Software Engineering");

    await sleep(1000);

    var year = element(by.id('year'));
    year.sendKeys("U1");  

  });


When(/^I request to create volunteer account$/,async () => {

    await sleep(1000);
    var signup_btn = element(by.css(".signup-volunteer-btn"));  
    browser.sleep(500);
    signup_btn.click();
  });


Then(/^the system indicates that the volunteer account has been successfully created$/, async () => {

    await sleep(1000);
    expect(await element(by.id('display')).getText()).to.equal('Acount Successfully Created');

  });



// 2) Scenario: (Alternate Flow) I succesfully create a volunteer account with valid email, password, name and no extra profile details.


When(/^I enter my first name, last name, email, password$/,async () => {

    var firstName = element(by.id('firstName'));
    firstName.sendKeys("Elon");

    await sleep(1000);

    var lastName = element(by.id('lastName'));
    lastName.sendKeys("Musk");

    await sleep(1000);

    var emailAddress = element(by.id('emailAddress'));
    emailAddress.sendKeys("elon.musk@gmail.com");

    await sleep(1000);

    var password = element(by.id('password'));
    password.sendKeys("abcd1234"); 

  });


When(/^I enter no extra profile details$/,async () => {

    var phoneNumber = element(by.id('phoneNumber'));
    phoneNumber.sendKeys("");

    await sleep(1000);

    var dob = element(by.id('dob'));
    dob.sendKeys("");

    await sleep(1000);

    var major = element(by.id('major'));
    major.sendKeys("");

    await sleep(1000);

    var year = element(by.id('year'));
    year.sendKeys("");  

  });

// 3) Scenario: (Error Flow) I don't successfully create a volunteer account because I input an invalid email

When(/^I eneter an existing email$/,async () => {

    var firstName = element(by.id('firstName'));
    firstName.sendKeys("Elon");

    await sleep(1000);

    var lastName = element(by.id('lastName'));
    lastName.sendKeys("Musk");

    await sleep(1000);

    var emailAddress = element(by.id('emailAddress'));
    emailAddress.sendKeys("elon.musk@gmail.com");

    await sleep(1000);

    var password = element(by.id('password'));
    password.sendKeys("abcd1234"); 

  });

  Then(/^the system warns me that I have entered an existing email$/, async () => {

    await sleep(1000);
    expect(await element(by.id('display')).getText()).to.equal('Error: Email Already Exists');

  });