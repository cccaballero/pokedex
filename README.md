# Pokedex

This repository contains a React Native project that aims to provide a usage example of React Native and the PokeAPI API.

## Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Step 1

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/react-native-project.git
```

### Step 2

Navigate to the project directory:

```bash
cd react-native-project
```

### Step 3

Install the project dependencies:

```bash
npm install
```

### Step 4

Rename (copy and rename) the file `env.template` to `.env`

```bash
npm install
```

### Step 4: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
npm start
```

### Step 5: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
npm run android
```
## Folder Structure

Explain the organization of the project's folders and files. For example:

- /App: Contains the source code of the React Native application.
   - /components: Includes reusable UI components.
   - /redux: Includes redux store.
   - /routing: Handles app navigation and routing.
   - /screens: Contains individual screens or views.
   - /services: Includes calls to APIs or services.
   - /utils: App utilities and reusable functions.

## Comments

- Followed [Mobile Pokedex App](https://dribbble.com/shots/16833947-Mobile-Pokedex-App-Design-Exploration/attachments/11892526?mode=media) design exploration. Not pixel perfect.
- Used Redux Toolkit and Thunk for async operations.
- The app looks for the environment variable `BASE_URL` as the base URL for api requests, this is useful for setting different environments as production, stage, development, etc.
- The app uses a styled components approach, with styles defined for each component. In a bigger app using a global approach for styles can be useful for reusing styles between different components.
- Typescript types are a little messy. Well, not messy, but a couple of types definitions are missing like routing or Thunk actions.
- The PokeAPI API does not have an endpoint to perform searches, it would be possible to implement a search using the `pokemon/pokemon_name` endpoint to search for exact matches in the name of the Pokemon, or even, taking into account that there are little more than 1000 records, it is possible to obtain them all and filter.
