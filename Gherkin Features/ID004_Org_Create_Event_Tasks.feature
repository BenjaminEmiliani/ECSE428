# Matt Langshur feature ID004 | ECSE 428
Feature: Organizer Create Event Tasks

    As an organizer, I would like to be able to add/create tasks for an event
    Tasks are individual jobs / tasks that volunteers and/or organizers need to be assigned to for an event

Scenario: Create a New Task (Normal Flow)

Given Organizer is logged into the Event Registration system
Given an event NewEvent exists 
And NewEvent has 0 existing tasks
When requesting the creation of task NewTask for event NewEvent
Then task NewTask is created for event NewEvent

Scenario: Create Task with Title and Description (Alternate Flow)

Given Organizer is logged into the Event Registration system
Given an event NewEvent exists
And NewEvent has 0 existing tasks
When requesting the creation of task NewTask with description "This is a new task" for event NewEvent
Then task NewTask is created with descripion "This is a new task" for event NewEvent

Scenario: Attempt to Create a Duplicate Task (Error Flow)

Given Organizer is logged into the Event Registration system
Given an event NewEvent exists 
And NewEvent has 0 existing tasks
And a task ExistingTask is created for event NewEvent
When requesting the creation of task ExistingTask for event NewEvent
Then a "Task already exists" error message is issued 
And only 1 ExistingTask task exists for event NewEvent

Scenario: Attempt to Create a Task as a Volunteer (Error Flow)

Given Volunteer is logged into the Event Registration system
Given an event NewEvent exists 
And NewEvent has 0 existing tasks
When requesting the creation of task NewTask for event NewEvent
Then a "Volunteer is not authorized to add a task" error message is issued
And 0 tasks exist for event NewEvent
