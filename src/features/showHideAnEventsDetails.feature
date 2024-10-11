Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default  
    Given the user is on the event list page
    When the event list is displayed
    Then each event element should be collapsed by default

  Scenario: User can expand an event to see details  
    Given the user is on the event list page
    And an event element is collapsed
    When the user clicks on the event element

  Scenario: User can collapse an event to hide details  
    Given the user is on the event list page and an event element is expanded
    When the user clicks on the event element again
    Then the event element should collapse to hide the event details