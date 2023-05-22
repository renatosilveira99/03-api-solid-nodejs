#App

GymPass style app.

##Functional Requirements (RFs)
[x] It should be possible to register.
[x] It should be possible to authenticate.
[x] It should be possible to retrieve the profile of a logged-in user.
[x] It should be possible to retrieve the number of check-ins performed by the logged-in user.
[x] It should be possible for the user to retrieve their check-in history.
[x] It should be possible for the user to search for nearby gyms.
[x] It should be possible for the user to search for gyms by name.
[x] It should be possible for the user to check-in at a gym.
[x] It should be possible to validate a user's check-in.
[x] It should be possible to register a gym.

##Business Rules (RNs)
[x] The user should not be able to register with a duplicate email.
[x] The user cannot make 2 check-ins on the same day.
[x] The user cannot check-in if they are not near the gym.
[x] The check-in can only be validated up to 20 minutes after it is created.
[x] The check-in can only be validated by administrators.
x[] The gym can only be registered by administrators.

##Non-functional Requirements (RNFs)
[x] The user's password needs to be encrypted.
[x] The application data needs to be persisted in a Postgres SQL database.
[x] All data lists should be paginated with 20 items per page.
[x] The user should be identified by a JWT (JSON Web Token).