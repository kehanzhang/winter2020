# Readme

*A location sharing app with a built-in chat service. <br />
Created for New Year New Hack 2020 by Alex Wang, Jeff Cheng, Kehan Zhang, and Lisa Tang.*

## Inspiration
Our team of four are composed of students from Duke University, and we are extremely excited to be able to return to campus next semester. College always promises a great time as it gives us students a chance to interact with friends and meet new people. Dott (given permission) broadcasts a user’s availability and location. This allows people to skip the “are you free?” and directly visit their friends at their dorm room or find them in the library to study together. On top of this, we wanted to make a way for students to meet new people virtually, based off of location. Find it a little hard to introduce yourself to your hallmates? Send them a message on Dott! With this idea, our team set off to build an app with exactly what's needed: a map function and a chat function.

## What it does
* **Geolocation:** With your permission, Dott broadcasts your location with friends, making it easy for partners to find each other when meeting for lunch or for parents to check on their kid’s safety on a night out late.
* **Chat Service:** With a single click, you can toggle from our map to a chat service. We support both personal messaging and group messaging, making it frictionless for users to alert friends to events and spur-of-the-moment get-togethers.
* **Anon Mode:** In Anon Mode, you can anonymously chat with new people in your proximal area, from finding a study buddy at school to just making a new friend!

## How we built it
We built this app using Javascript and CSS in React and used Firebase as our backend to store data and handle user authentication. We used firebase as our BaaS (Backend as a Service) and React on the frontend. We utilized firestore as our database and made use of its capabilities to view changes in our database in real time. We also used Google Cloud Platform (firebase included) to display our users' locations.

## Challenges we ran into
Most of us were entirely new to using React and Firebase, so we had to learn this new technology very quickly. We also had to learn how to fix debugging issues, structure data, and display data from the backend in pages and more while on a time crunch. Working in 3 different time zones, we quickly learned to adapt and communicate efficiently, especially when running into merge conflicts. Although we faced several challenges, working together and constantly communicating with each other allowed us to quickly resolve any issues and find solutions!

## Accomplishments that we're proud of
Because none of us are experienced in frontend, we’re especially proud of the work we put into developing our UI. The toggle button allows the user to seamlessly switch between the location-sharing map and the chat service. In addition, the custom map markers are color-coded to the user’s status (i.e. available, busy, dnd, eager, anonymous) and the user’s profile picture, making it very intuitive to see whose location you’re viewing and what they’re currently doing. These settings are updated in real time, giving the user the most accurate location and status. Upon clicking the marker, you can immediately chat with friends.

Another feature that we’re very excited about is our anon mode. Anon mode allows users to hide their name and profile picture in both the map and all chats. This provides safety and flexibility for meeting new friends in your area and is targeted towards university students because of their outgoing nature. 

## What we learned
Along with being one of our biggest struggles, our progress with Firebase is also one of the most important skills we’ve developed. In order to build a realtime chat service, we combed through countless tutorials and documentation to learn how to use services such as Cloud Firestore for storing our user data and Authentication for login and registration purposes. We look forward to exploring how we can take these lessons and further utilize Firebase as a backend platform for future projects.

## What's next for Dott
Next, we will be transitioning our app from web to mobile using React Native, allowing users to locate and communicate with their friends while on-the-go. We also hope to implement a tagging system where users can meet **new** friends in their area who have similar interests and hobbies (e.g. basketball, knitting, yoga). This is especially valuable on college campuses where students looking for a sense of community and belonging can gather the courage and take 2021 to step outside of their comfort zone!
