# habit-tracker

Project was built using Vue 3. It allows users to add habits to the list and track them.

## Features

- **Date Picker**: Easily navigate through different weeks with a date picker that distinguishes between the current date and the selected date.
- **Date Navigation**: Navigate to specific dates using the URL format `/day/YYYY-MM-DD`. Accessing the website without a path, or with a future or invalid date, redirects to the current day.
- **Local Storage**: Added habits retain their completion state across different days in local storage.
- **Habit Editing**: Edit habit names at any point.
- **Habit Stopping**: Stopping a habit removes it from the list on all days after that. It can be resumed on the day it was stopped or any day before that.
- **Habit Deletion**: Deleting a habit removes all its history from local storage.

## Installation

Run `npm install` in its directory. From that point onward, the command `npm run dev` should open a local server.
