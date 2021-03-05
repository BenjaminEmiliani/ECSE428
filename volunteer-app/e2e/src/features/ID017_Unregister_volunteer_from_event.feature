Feature: Volunteer unregisters from event
As a Volunteer, I want to be able to unregister from an event 
so that I would be able to change my plans.


Scenario: Attempt to unregister from event without selecting one (Error Flow)

Given I am logged in as a Volunteer
When I request to unregister without selecting an event
Then an error message is issued