# Met Explorer

### [Deployed Site](https://met-explorer.netlify.app/)

##

<p align="left">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Cypress.io-6e3596?style=for-the-badge&logo=cypress" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
</p>

### Abstract

Met Explorer is a React/Redux web application that allows users to browse The Metropolitan Museum of Art's nearly half-million pieces of artwork and historical artifacts. Users can create create their own "collections," add artwork to each collection, and add personal annotations to each piece. Designed with accessibility and device-responsiveness in mind, the UI/UX strives for simplicity and ease-of-use, with an on-brand, minimalistic design.

A Cypress acceptance test suite is also included with the project. See installation instructions below for running the application and/or tests locally.

### Demo

![met-explorer-demo](https://user-images.githubusercontent.com/108169988/210706252-c2912246-bcf7-4272-835f-f8d1eeeb5b56.gif)

### Project Context

Met Explorer is an extracurricular personal project I made in order to teach myself Redux and SCSS. Being a frequent visitor of the MET during my years living in New York, I was excited to find their [Art Collection API](https://metmuseum.github.io/), and felt that the dataset would also present an opportunity to work with larger datasets than I had worked with in the past. Figuring out a way to present the user with multiple pages of potentially tens-of-thousands of results was an interesting challenge, and is a process I'm looking forward to learning how to optimize for future projects. As always, thoughts and constructive feedback are welcome!

### Tech

- JavaScript ES6
- React.js
- React Router
- Redux
- Redux Thunk
- Sass/SCSS
- Cypress.io
- HTML5
- Figma
- Webpack
- Netlify

### Figma Wireframe

![met-explorer-figma1](https://user-images.githubusercontent.com/108169988/210702234-74965794-cd15-4115-a722-212a3f62af97.png)
![met-explorer-figma2](https://user-images.githubusercontent.com/108169988/210702237-9a357b49-ae46-474a-afcf-616b9ecbc777.png)
![met-explorer-figma3](https://user-images.githubusercontent.com/108169988/210702238-67dc0236-2adf-412f-933b-85762ebfddd2.png)


### Installation Instructions

1. Fork this repository.
2. Clone your forked repository to your machine.
3. `cd` into the top level of the project repository from the command line and run `npm i`.
4. Run `npm start` to launch the application's server.
5. Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the live page.
6. To run the Cypress test suite, run `npm run cypress` from the command line while in the top level of the project directory.
