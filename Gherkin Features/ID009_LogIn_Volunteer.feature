Feature: Log in as a volunteer

    As a volunteer, I would like to log into the application.

    #NORMAL FLOW
    Scenario: Log in with username
        Given a username has an account
        When its username is user123
        And the password is password123
        Then logged in successfully


    #ERROR FLOW
    Scenario: Incorrect password
        Given a username has an account
        When its username is user123
        And the password entered is password12  #incorrect password, should be password123
        Then incorrect password

    #ERROR FLOW
    Scenario: Username doesn't exist
        Given a username has an account
        When username written is user12         #username doesn't exist is user123
        And the password is password123
        Then username does not exist