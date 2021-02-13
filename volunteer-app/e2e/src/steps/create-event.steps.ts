import { Before, Given, Then, When } from 'cucumber';
import { expect, assert } from 'chai';
import { AppPage } from '../app.po';
import { Event } from "../../../src/app/model/event"


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

Given(/^I am on the event page$/, async () => {
  await page.navigateTo();
});

When(/^requesting the creation of event EventTest, of Category1, on 2021-03-15, from 08:00 AM to 10:00 AM$/, () => {
  page.newEvent(event.name, event.category, event.date, event.startTime, event.endTime);
});

Then(/^event EventTest is created in the system$/, async () => {
  expect(await page.getEvent()).to.equal(event.name);
});