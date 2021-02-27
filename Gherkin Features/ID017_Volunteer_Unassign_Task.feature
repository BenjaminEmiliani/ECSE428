# Backlog item ID017 | ECSE 428 Group 3 | Arianit Vavla, 260868601
Feature: Volunteer unassigns from event
As a Volunteer, I want to be able to unassign myself from an event so that I would be able to change my plans.


Scenario Outline: Unassign myself from an event (Normal Flow)

Given I am logged in as Volunteer
When I unregister from event <EventName>
Then the event <EventName> is removed from my list of events

Examples:
	| EventName |
	| FoodDrive |


Scenario Outline: Unassign myself from multiple events (Alternative Flow)

Given I am logged in as Volunteer
When I request to unregister from event <EventName1>
And I request to unregister from event <EventName2> 
Then the events <EventName1> and <EventName2> are removed from my list of events

Examples:
	| EventName1 | EventName2 |
	| FoodDrive  | McHacks    |


Scenario Outline: Unassign myself from event I am not registered to (Error Flow)

Given I am logged in as Volunteer
When I request to unregister from event <EventName1> which I am not registered to 
Then an error message is issued