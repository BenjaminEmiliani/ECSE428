# Matthew Langshur 260704964
Feature: Organizer Deletes an Event

  As an organizer, I would like to delete an event that I have created. 

Background: 
    Given an organizer with first name <firstname> lastname <lastname> and id <id> exists in the system
        Examples:
            |id | firstname | lastname |
            | 1 | John      | Smith    |
            | 2 | Jim       | Doe      |
            | 3 | Scott     | Paul     |

    Given a volunteer with first name "Findlay" lastname "yaldnif" and id "1" exists in the system
    Given an event with id <id> and event name <eventName> and with organizer <organizerID> exists in the system
        Examples:
            | id | eventName  | organizerID |
            | 1  | Club Rouge |      1      |
            | 2  | Tokyo      |      3      |

Scenario Outline: Delete an Event (Normal Flow) 
    Given I am logged in as an organizer with id "1"
    When I am on the delete event page
    And I choose to delete the event with id "1"
    Then event with id "1" will be successfuly deleted
    And the system shows that my deletion was sucessful 

Scenario Outline: Delete an Event as a Different Organizer (Error Flow)
    Given I am logged in as an organizer with id "1"
    When I am on the delete event page
    And I choose to delete the event with id "2"
    Then event with id "1" will not be successfuly deleted
    And the system will display error message "Organizer did not organize selected event"
