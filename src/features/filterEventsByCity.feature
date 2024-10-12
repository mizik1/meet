Feature: Filter Events By City

    Scenario: When user hasn’t searched for a city, show upcoming events from all cities
        Given the user has not searched for a city
        When the user views the event list
        Then the user should see upcoming events from all of the cities

    Scenario: User should see a list of suggestions when they search for a city
        Given the user is searching for a city
        When the user types in the search bar
        Then the user should see a list of city suggestions matching the input

    Scenario: User can select a city from the suggested list
        Given the user is viewing the list of city suggestions
        When the user selects a city from the suggested list
        Then the selected city should be set as the search criteria
        And the user should see events for the selected city