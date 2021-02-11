import { Before, Given, Then, When } from 'cucumber';
import { expect, assert } from 'chai';
import { Volunteer } from "../../../src/app/model/volunteer";
import {FirebaseService} from "../../../src/app/FirebaseService.service";

import { AppPage } from '../app.po';
import { AngularFireDatabase } from '@angular/fire/database';

let page: AppPage;
let user: any;


Before(() => {
  page = new AppPage();
  user = new Volunteer();
});


When(/^I enter my info and click signup$/, () => {
    user.name = "joe";
});

Then(/^I am registered volunteer of the system$/, async () => {
  assert.equal(user.name, "joe");
});