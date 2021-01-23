# Backlog item ID010

Feature: Log in as an organizer

As an organizer, I want to be able to log into my account in the application 
with my username and password


#Normal Flow
Scenario: Log in successfully
	Given I (an organizer) have an account
	When my username "validOrganizer" is entered
	And my password "validPassword" is entered
	Then I log in successully
	And I am sent to my home page
	

#Error flow
Scenario: Log in with incorrect username
	Given I (an organizer) have an account
	When username "invalidOrganizer" is entered
	And my password "validPassword" is entered
	Then I cannot log in
	And I get an "invalid username" message


#Error flow
Scenario: Log in with incorret password
	Given I (an organizer) have an account
	When my username "validOrganizer" is entered
	And password "invalidPassword" is entered
	Then I cannot log in
	And I get an "invalid password" message