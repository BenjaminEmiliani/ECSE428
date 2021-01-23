# Sami Hilal feature ID012

Feature: Volunteer assigns themselves to a task in an event

As a volunteer, I would like to assign myself to a task in an event so that I can help the organizer.

Scenario : Pick A Task Offered In An Event (Normal Flow)

The chosen task shall appear in my calandar

Given I am signed in as user Volunteer
And I have chosen event FoodDrive
And the tasks have been initialized
When the task Courier has been selected
Then I should see the task in my calandar

Scenario : Pick Sevral Non-Conficting Tasks Offered In An Event (Alternate Flow)

The chosen tasks shall appear in my calandar

Given I am signed in as user Volunteer
And I have chosen event HomelessShelter
And the tasks have been initialized
When the following tasks are requested
	|Task		|Start time		|End time		|
	|Janitor	|2021-03-22-19-30-00	|2021-03-22-20-30-00 	|
	|Cafeteria	|2021-03-24-19-30-00	|2021-03-24-20-30-00	|
	|Laundry	|2021-03-25-19-30-00	|2021-03-25-20-30-00	|
Then I should see the tasks in my calandar

Scenario : Pick Sevral Time-Conficting Tasks Offered In An Event (Error Flow)

The tasks should not appear in my calandar

Given I am signed in as user Volunteer
And I have chosen event OldFolksHome
And the tasks have been initialized
When the following tasks are requested
	|Task		|Start time		|End time		|
	|Janitor	|2021-03-22-19-30-00	|2021-03-22-20-30-00 	|
	|Cafeteria	|2021-03-22-20-00-00	|2021-03-22-20-30-00	|
	|Laundry	|2021-03-25-19-30-00	|2021-03-25-20-30-00	|
Then I should receive an error message
