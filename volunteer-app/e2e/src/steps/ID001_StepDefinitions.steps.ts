
// import { SignupComponent } from "../../../src/app/signup/signup.component";
// import { Given, Then, When } from 'cucumber';
// import { expect } from 'chai';
// import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
// import { Volunteer } from "../../../src/app/model/volunteer";
// import {FirebaseService} from "../../../src/app/FirebaseService.service";


// class Stepdefs{

//     constructor(private db: AngularFireDatabase, private firebase: FirebaseService) { }

//     // 1) Scenario: (Normal Flow) I succesfully create a volunteer account with valid email, password, name and provide extra profile details.

//     private signup: SignupComponent;

//     Given('the system does not contain an account with associated with <email>', function () {
//     // Write code here that turns the phrase above into concrete actions
//     var email = "marw.khan@gmail.com";
//     var output = this.signup.checkVolunteerExists(email);
//     assert.equal('false', output);
//     });


//     When('I enter my email, password, first name, last name', function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
//     });


//     When('I enter extra profile details', function () {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending';
//     });


//     When('I request to create volunteer account', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });


//     Then('the volunteer account is created', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });


//     Then('the system indicates that the volunteer account has been successfully created', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });

//     // 2) Scenario: (Alternate Flow) I succesfully create a volunteer account with valid email, password, name and no extra profile details.


//     Given('the system does not contain an account with associated with <email>', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });


//     When('I enter my email, password, first name, last name', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });


//     When('I enter no extra profile details', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });

//     When('I request to create volunteer account', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });


//     Then('the volunteer account is created', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });


//     Then('the system indicates that the volunteer account has been successfully created', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });

//     // 3) Scenario: (Error Flow) I don't successfully create a volunteer account because I input an invalid email


//     Given('the system does not contain an account associated with <email>', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });


//     When('I eneter an invalid email', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });


//     When('I request to create volunteer account', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });


//     Then('the account is not created', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });


//     Then('the system warns me that I have entered an invalid email', function () {
//         // Write code here that turns the phrase above into concrete actions
//         return 'pending';
//     });


// }

    