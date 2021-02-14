import { Before, Given, Then, When } from 'cucumber';
import { expect, assert } from 'chai';
import { AppPage } from '../app.po';
import { Event } from "../../../src/app/model/event";
import { browser, by, element, protractor } from 'protractor';


let page: AppPage;
let event: any;


Before(() => {
  page = new AppPage();
  event = new Event();
  event.name = "EventTest";
  event.category = "Category1";
  event.date = "2021-03-15";
  event.startTime = "08:00 AM";
  event.endTime = "10:00 AM";
});

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}


Given(/^I am on the event page$/, async () => {
  return browser.get(browser.baseUrl);
});

When(/^requesting the creation of event EventTest, of Category1, on 2021-03-15, from 08:00 AM to 10:00 AM$/, () => {
  page.newEvent(event.name, event.category, event.date, event.startTime, event.endTime);
});

Then(/^event EventTest is created in the system$/, async () => {
  await sleep(1000);
  expect(await page.getEventCreation()).to.equal("The event has been created");
});

/*
Given(/^I am on the event page and want to create an event without category$/, async () => {
  await page.navigateTo();
});

When(/^requesting the creation of event EventTest, on 2021-03-15, from 08:00 AM to 10:00 AM$/, () => {
  page.newEvent(event.name, "", event.date, event.startTime, event.endTime);
});

Then(/^event EventTest without a category is created in the system$/, async () => {
  expect(await page.getEventCreation()).to.equal("The event has been created");
});

Given(/^I am on the event page and want to create an event without a name$/, async () => {
  await page.navigateTo();
});

When(/^requesting the creation of event on 2021-03-15, from 08:00 AM to 10:00 AM$/, () => {
  page.newEvent("", "", event.date, event.startTime, event.endTime);
});

Then(/^a "Name is required to create an event" error message is issued$/, async () => {
  expect(await page.getNotSuccessfulEventCreation()).to.equal(">> required");
});
*/