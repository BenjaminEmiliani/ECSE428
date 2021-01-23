Feature: Register a volunteer to an event

  As a volunteer I would like to register to an existing event 
  so that I can participate in it

  Background: 
  	Given the volunteering event 'Soup Kitchen Lasalle' exists
    

  Scenario Outline: User becomes a volunteer of an event (Normal Flow)
   
    Given user "<volunteer>" is a registered volunteer
    When user "<volunteer>" clicks on Volunteer for event Soup 'Kitchen Lasalle'
    Then "<volunteer>" will be in the list of participants for event 'Soup Kitchen Lasalle'

	 Examples: 
	 
      | volunteer   | 
      | John Doe    |   
      | Katie Myers |   
      | Mitchel Da  |   
      
      
      
   Scenario Outline: User tries to register for a removed event (Error Flow)
   
    Given user "<volunteer>" is a registered volunteer
    But the event 'Soup Kitchen Lasalle' has been removed
    When user "<volunteer>" clicks on Volunteer for event Soup 'Kitchen Lasalle'
    Then the event 'Soup Kitchen Lasalle' is not in the events registered for "<volunteer>" 


	 Examples: 
	 
      | volunteer   | 
      | John Doe    |   
      | Katie Myers |   
      | Mitchel Da  |   