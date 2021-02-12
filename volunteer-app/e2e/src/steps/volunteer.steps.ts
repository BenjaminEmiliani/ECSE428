import { Before, Given, Then, When } from 'cucumber';
import { expect, assert } from 'chai';
import { AppPage } from '../app.po';
import {Volunteer} from "../../../src/app/model/volunteer"


let page: AppPage;
let user: any;


Before(() => {
  page = new AppPage();
  user = new Volunteer();
  user.name = "Jim";
  user.last_name = "Doe";
});

Given(/^I am on the home page$/, async () => {
  await page.navigateTo();
});

When(/^I enter my info and click submit$/, () => {
  page.newName(user.name);
});

Then(/^I my name will be changed$/, async () => {
  expect(await page.getUsername()).to.equal(user.name + ' ' + user.last_name);
});