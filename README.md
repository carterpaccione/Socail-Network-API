# <center>Socail Network API [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)</center>

<center>In this application, using MongoDB with mongoose, users can test routes for creating users and performing differnet actions such as, creating a thought, a reaction to that thought, and updating or deleting said information.</center>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

Downloading the code:
Open the terminal and run "npm i", "npm run build", using your own database configured in a .env file, type "npm run start". Then open insomnia or another API development platform to start running CRUD operations.

## Usage

/api/users:

GET - to get all users

POST - example: { "username": "username", "email": "email"} - to create a user

/api/users/:id

GET - to get a user by id

PUT - example: {  "username": "newUsername" } - to update a user's information

DELETE - to delete a user along with the thoughts they have created

/api/users/:id/friends/:friendId

POST - to add a friend to the user

DELETE - to delete a friend from the user

/api/thoughts

GET - to get all thoughts

POST - example: { "userID": "1234567890", "thoughtText": "thought", "username": "username" } - to create a thought and connect it to the user

/api/thoughts/:thoughtID

GET - to get a specific thought

PUT - example: { "thoughtText": "new thought" } - to update the thought's contents

DELETE - to delete the thought

/api/thoughts/:thoughtID/reactions

POST - example: { "reactionBody": "reaction", "username": "username" } - to post a reaction to a specific thought

/api/thoughts/:thoughtID/reactions/:reactionID

DELETE - to delete a reaction from a thought

## License
  
Distributed under MIT License. See https://choosealicense.com/licenses/mit/ for more information.

## Contributing

Carter Paccione

## Tests

N/A

## Questions

For any questions, please contact me at: 
carterpaccione@gmail.com.

GitHub: https://github.com/carterpaccione
