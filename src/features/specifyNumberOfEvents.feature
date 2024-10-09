Feature 3: Specify Number of Events

Scenario: When user hasn’t specified a number, 32 events are shown by default

Given the user has not specified a number of events to display
When the user views the event list
Then 32 events should be shown by default

Scenario: User can change the number of events displayed
Given the user wants to change the number of events displayed
When the user specifies a different number of events
Then the specified number of events should be displayed