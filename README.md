# QuestionTime Frontend Application

Welcome to the QuestionTime (QT) frontend application repository! This repository contains the codebase for the user interface (UI) of QuestionTime, a SaaS platform that allows registered users to set up multiple-choice questions for the public.

#### Please Note: This application is not production ready, but as a test project for a job application. It lacks certain optimization due to lack of time to work on it.

## Introduction

QuestionTime (QT) provides a platform where users can easily create and manage multiple-choice questions. The frontend application interacts with the backend APIs provided by QT to facilitate question setup and management.

## How to use

The functionality of the UI in the application is basically to allow users do the following:

1. Visit [the frontend application here](https://organogram-next-app.vercel.app/)
2. Enter your email address and a personal token will be generated for you
3. Once you are onboarded, you can carry out basic CRUD operations on the questions in your dashboard.

## Backend APIs

The backend engineers of QT have provided a set of APIs to support the frontend work. These APIs are available at [https://qt.organogram.app/](https://qt.organogram.app/). The OpenAPI documentation for the API is available at [https://qt.organogram.app/openapi.yaml](https://qt.organogram.app/openapi.yaml).

The API uses Token authentication. Users need to include their personal token in the header when making requests. For example:

To obtain a token, users can send a POST request to the `/token` endpoint with their email address. Upon successful request, a token will be provided in the response, which should be stored for all question management operations.

## Main Functionality

The main functionality of the frontend application includes:

- Displaying existing questions and their configured options.
- Creating new questions along with options.
- Adding or removing options to questions.
- Ensuring each question has a minimum of 3 options and a maximum of 5 options.

## Technology Stack

This frontend application is built using [Next.js](https://nextjs.org/), [Material UI](https://mui.com/), [Redux ToolKit](https://redux-toolkit.js.org/), and other supporting technologies.

## Original Content

No templates was used to create the application. No UI/UX design. Just direct design from the abstract world 😁

Thank you for using QuestionTime!
