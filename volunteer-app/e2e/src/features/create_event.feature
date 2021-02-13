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
