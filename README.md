# Fetch-Take-Home

This project was created using the command `npx create-react-app my-ts-app --template typescript`. It makes use of React, Typescript and Emotion (used for styles).

Follow the steps below to run the project locally.

## Clone

Clone the project locally by using this command ``.

Open the project and install the packages using `npm i`.

Once the installation finishes, you can immediately run the project using `npm start`.

## Usage

The project initially prompts the user with a login screen that asks for a name and password at `/login`.

Upon successful authentication the user is navigated to `/`.

Apart from the login page, for this exercise everything is set up to work on the home page.

Once navigated to `/` the user will immediately be shown dogs obtained from the provided backend.

The user has the ability to search by:
1. Breed
2. Zip Code
3. Age

Additionally, the user may also paginate through the results, and sort by:
1. Breed
2. Age
3. Name

The user also has the ability to select their favorite dogs, and generate a match using the selected dogs (provided from the backend)
