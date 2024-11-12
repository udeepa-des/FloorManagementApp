# Floor Management Application

This is a floor management application built with React. It allows users to manage tables and floor layouts using drag-and-drop functionality. The application utilizes various libraries and tools to provide a smooth user experience.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Validating the Use of Chosen Libraries and Tools](#validating-the-use-of-chosen-libraries-and-tools)
- [Technologies Used](#technologies-used)
- [Scripts](#scripts)

## Installation

To get started with the application, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/udeepa-des/FloorManagementApp.git
   cd FloorManagementApp

    Install the dependencies:

    npm install

Running the Application

After the dependencies are installed, you can run the application with the following command:

npm start

This will start the development server and open the application in your browser.

To build the application for production, use:

npm run build

Validating the Use of Chosen Libraries and Tools

The following libraries and tools were chosen for this application to ensure scalability, maintainability, and efficient development:
Libraries:

    @dnd-kit/core and @dnd-kit/utilities:
        These libraries are used for implementing drag-and-drop functionality in the floor management system.
        Why it was chosen: It provides a flexible and highly customizable API for handling drag-and-drop, making it suitable for our use case of arranging tables on a floor.

    Formik and Yup:
        Formik is used for managing form state, and Yup is used for schema validation.
        Why it was chosen: Together, they simplify form handling and validation, reducing the boilerplate code required for managing forms.

    React-Redux and @reduxjs/toolkit:
        React-Redux is used for managing global state, and Redux Toolkit simplifies the process of writing Redux logic.
        Why it was chosen: Redux Toolkit offers an easy-to-use API for managing state, with built-in features like thunk middleware for async operations, making state management seamless and efficient.

    React-Toastify:
        This library is used for displaying toast notifications.
        Why it was chosen: React-Toastify provides an easy and customizable way to display non-blocking notifications, making it ideal for alerting users of system status.

    Tailwind CSS:
        A utility-first CSS framework used for styling the application.
        Why it was chosen: Tailwind's utility-first approach makes it easy to rapidly prototype and create responsive, customizable UIs with minimal custom CSS.

    Lucide-react:
        Used for providing icon components.
        Why it was chosen: Lucide-react offers a wide range of high-quality icons that are easy to integrate into the application.

Tools:

    React:
        The core JavaScript library for building user interfaces.
        Why it was chosen: React provides a declarative and component-based approach to building UIs, which enhances maintainability and scalability.

    TypeScript:
        Used for adding static types to JavaScript.
        Why it was chosen: TypeScript helps catch errors during development and provides better tooling for developers through type safety, enhancing maintainability.

    Tailwind CSS:
        This utility-first CSS framework is used for styling the application.
        Why it was chosen: Tailwind's flexibility allows us to quickly build responsive and well-designed interfaces without writing custom CSS.

Technologies Used

    React (version 18.3.1) for building the user interface.
    TypeScript for type safety.
    Tailwind CSS for styling.
    Formik and Yup for handling forms and validation.
    React-Redux and @reduxjs/toolkit for state management.
    React-Toastify for displaying toast notifications.
    Lucide-react for icons.
    @dnd-kit for drag-and-drop functionality.

Scripts

The following npm scripts are available:

    npm start: Starts the development server.
    npm run build: Builds the application for production.
