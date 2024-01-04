# Quizzical React Quiz App

Quizzical is a React-based quiz application that fetches general knowledge questions from the Open Trivia Database (OTDB) API and allows users to answer them.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [License](#license)

## Features

- Fetches quiz questions from the OTDB API based on the user's selected number.
- Randomize answer choices for each question.
- Allows users to select answers and check correctness.
- Displays the final score after checking answers.
- Option to play the quiz again with a different set of questions.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/dzhu0/quizzical.git
   ```

2. Navigate to the project directory:

   ```bash
   cd quizzical
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the application:

   ```bash
   npm run dev
   ```

2. Open your web browser and visit the "Local" link displayed.

3. Follow the on-screen instructions to set the number of questions and start the quiz.

## Components

### 1. App

- **Description:** Main component managing the flow of the application.
- **File:** `App.jsx`
- **Responsibilities:**
  - Controls the start of the quiz.
  - Handles the number of questions input.
  - Fetches questions from the OTDB API.
  - Renders either the Intro or Quiz component based on the application state.

### 2. Intro

- **Description:** Component for the quiz introduction and configuration.
- **File:** `Intro.jsx`
- **Responsibilities:**
  - Allows users to set the number of questions.
  - Triggers the start of the quiz.

### 3. Quiz

- **Description:** Component for rendering and managing the quiz questions.
- **Files:** `Quiz.jsx`, `Problem.jsx`
- **Responsibilities:**
  - Randomize answer choices.
  - Allows users to select answers.
  - Checks the correctness of answers.
  - Displays the final score and offers the option to play again.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
