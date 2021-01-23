Feature: Create account for volunteer

User Story:
As a volunteer
I want to be able to create an account
With my McGill email and password
So that I can start regestering for events

  Background: 
    Given I am a McGill Student
      And I have a valid McGill email and password
  
  Scenario: I succesfully create a volunteer account (Normal Flow)
     When I enter my McGill email, password, student ID, first name and last name
      And I select account type as volunteer
     Then the volunteer account is created
      And the system indicates that the volunteer account has been successfully created
  
  Scenario: I don't successfully create a volunteer account because I input an invalid email (Error Flow)
     When I eneter an invalid email
      And I request to create volunteer account
     Then the account is not created
      And the system warns me that I have entered an invalid email
  
  Scenario: I don't successfully create a volunteer account because I input an invalid McGill ID (Error Flow)
     When I eneter an invalid McGill ID
      And I request to create volunteer account
     Then the account is not created
      And the system warns me that I have entered an invalid McGill ID
