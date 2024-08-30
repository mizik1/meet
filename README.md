# meet

Desrciption: This is a meet app that fetches events.

Scenario 1: An event element is collapsed by default

Given the user is on the event list page
When the event list is displayed
Then each event element should be collapsed by default

Scenario 2: User can expand an event to see details

Given the user is on the event list page
And an event element is collapsed
When the user clicks on the event element

Scenario 3: User can collapse an event to hide details

Given the user is on the event list page
And an event element is expanded
When the user clicks on the event element again
Then the event element should collapse to hide the event details
Then the event element should expand to show the event details
