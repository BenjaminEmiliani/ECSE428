# Ragheed Qasmieh feature ID003
Feature: Create Event

  As an organizer, I would like to be able to add/create an event so that
	volunteers can register/be assigned for the tasks that will be created later for the event.

Scenario Outline: Create a New Event (Normal Flow)

Given I am on the event page
When requesting the creation of event <EventName>, of <Category>, on <Date>, from <StartTime> to <EndTime> 
Then event <EventName> is created in the system
Examples:
	| EventName | Category  | Date           | StartTime | EndTime  |
	| EventTest | Category1 | 2021-03-15     | 08:00 AM  | 10:00 AM |

Scenario: (Alternate Flow) I succesfully create a volunteer account with valid email, password, name and no extra profile details.
   	Given I am on volunteer signup page
	When I enter my first name, last name, email, password
    And I enter no extra profile details
    And I request to create volunteer account
	Then the system indicates that the volunteer account has been successfully created
 
Scenario: (Error Flow) I don't successfully create a volunteer account because I input an invalid email
	Given I am on volunteer signup page
	When I eneter an existing email
	And I request to create volunteer account
	Then the system warns me that I have entered an existing email