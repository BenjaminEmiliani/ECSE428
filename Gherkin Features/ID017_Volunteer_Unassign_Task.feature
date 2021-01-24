# Backlog item ID017 | ECSE 428 Group 3 | Arianit Vavla, 260868601
Feature: Volunteer unassigns from task
As a Volunteer, I want to be able to unassign myself from a task so that I would be able to change my plans.


Scenario: Unassign from a task that was picked (Normal Flow).

Given I am registered as user Volunteer
And the event FoodDrive exists
When I am registered to a FoodDrive task
Then I can unassign myself from FoodDrive task


Scenario: Unassign from multiple tasks that where picked (Alternative Flow).

Given I am registered as user Volunteer
And the event HomelessShelter exists
When I am registered to HomelessShelter tasks
Then I can unassign myself from all HomelessShelter tasks at the same time


Scenario: Unassign from a task not registered to (Error Flow).

Given I am registered as user Volunteer
When I am not registered to any task
And I try to unassign from a task
Then An error message "You cannot unassign from a task you were not assigned to" is issued