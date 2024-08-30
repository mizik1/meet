# meet

Desrciption: This is a meet app that fetches events.

Feature 1: Filter Events By City

Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities

Given the user has not searched for a city
When the user views the event list
Then the user should see upcoming events from all cities

Scenario 2: User should see a list of suggestions when they search for a city

Given the user is searching for a city
When the user types in the search bar
Then the user should see a list of city suggestions matching the input

Scenario 3: User can select a city from the suggested list

Given the user is viewing the list of city suggestions
When the user selects a city from the suggested list
Then the selected city should be set as the search criteria
And the user should see events for the selected city

Feature 2: Show/Hide Event Details

Given the user is viewing the list of city suggestions
When the user selects a city from the suggested list
Then the selected city should be set as the search criteria
And the user should see events for the selected city

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

Feature 3: Specify Number of Events
Scenario 1: When user hasn’t specified a number, 32 events are shown by default

Given the user has not specified a number of events to display
When the user views the event list
Then 32 events should be shown by default

Scenario 2: User can change the number of events displayed
Given the user wants to change the number of events displayed
When the user specifies a different number of events
Then the specified number of events should be displayed

Feature 4: Use the App When Offline
Scenario 1: Show cached data when there’s no internet connection

Given the user has previously used the app with an internet connection
And the app has cached data
When the user is offline
Then the app should show the cached data

Scenario 2: Show error when user changes search settings (city, number of events)
Given the user is offline
When the user attempts to change the search settings (city or number of events)
Then an error message should be displayed indicating that the user is offline

Feature 5: Add an App Shortcut to the Home Screen
Scenario 1: User can install the meet app as a shortcut on their device home screen

Given the user is using a device that supports app shortcuts
When the user chooses to install the meet app
Then the meet app should be added as a shortcut on the device home screen

Feature 6: Display Charts Visualizing Event Details
Scenario 1: Show a chart with the number of upcoming events in each city

Given the user is viewing the event data
When the app loads the event details
Then a chart should be displayed showing the number of upcoming events in each city
