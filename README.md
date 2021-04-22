# Conway's *Game of Life*

## About the Project

This repository is my React.js implementation of **Conway's *Game of Life*** for Lambda School's CS42 Build Week 01.

Much of the planning and information about this project can be found in the [GitHub Wiki](https://github.com/chazkiker2/conway_game_of_life_react/wiki)

### Requirements

- [ ] Visualization
  - [x] Grid to display cells
  - [ ] Cell objects/components that, at a minimum, should have:
    - [x] current state
    - [x] clickable
      - [x] can be clicked to allow user to setup initial cell configuration
      - [ ] should NOT be clickable while simulation is running
    - [x] Toggle state functionality
  - [ ] Text to display current generation # being displayed
  - [x] Button(s) that start & stop the animation
  - [x] Button to clear the grid
- [ ] Application State & Functionality
  - [x] An appropriate data structure to hold a grid of cells at minimum 25x25
  - [x] Game of Life Algorithm
    - [x] For each cell in current generation's grid:
      - [x] Examine state of all eight neighbors
      - [x] Apply rules of life to determine if this cell will change states
      - [x] When main loop completes: swap current & next grids, repeat simulation until stopped
    - [x] Break down the aforementioned steps into appropriate sub-tasks implemented with modular, readable code
    - [x] Use double buffering to update grid with next generation
    - [x] Does something well-documented with the edge of the grid (e.g., wrap around to the far side)
- [ ] Custom Features (Implement at least 3 of the following features):
  - [ ] Create a few sample cell configurations that users can load and run
  - [ ] Add an option that creates a random cell configuration that users can
  run
  - [ ] Add additional cell properties, like color or size, and incorporate
  them into your visualization
  - [ ] Allow users to specify the speed of the simulation
  - [ ] Provide functionality to manually step through the simulation one generation at a time, as opposed to animating automatically
  - [ ] Allow users to change the dimension of the grid being displayed
  - [ ] Given a specific generation, calculate the configuration of cells at that point in time, and jump to that state, bypassing animation (i.e. skip ahead _n_ generations).
  - [ ] If you have an idea for a custom feature on this list, run it by your TL or instructor
- [ ] About
  - [ ] On the main entry point of the application, include a separate section or link to another page or popup that describes the two main rules (birth & death) of Conway’s Game of Life
- [ ] Stretch Goals
  - [ ] Implement 2+ additional custom features, above
  - [ ] Deploy your app to a hosting service or, for iOS, to TestFlight (or the App Store!). Web developers can see [more deployment info here](resources/web/deployment).
  - [ ] Write a how-to guide or blog post that walks readers through the
  work you did to implement your project
  - [ ] Expand your simulation into the third dimension. Google `3D Conways Life`. Google for how to do 3D stuff on your platform. Web users might check out [3D-ThreeJS](https://github.com/LambdaSchool/3D-ThreeJS),and iOS might look at [SceneKit](https://developer.apple.com/scenekit/).
  - [ ] Explore alternate algorithms for finding the nth generation, such as [Hashlife](https://en.wikipedia.org/wiki/Hashlife)

## Available Scripts

In the project directory, you can run:

- `npm start`
  - Runs the app in the development mode. \
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser. \
  The page will reload if you make edits. You will also see any lint errors in the console.
- `npm test`
  - Launches the test runner in the interactive watch mode. \
  See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
- `npm run build`
  - Builds the app for production to the `build` folder.\
  It correctly bundles React in production mode and optimizes the build for the best performance.
  - The build is minified and the filenames include the hashes. \
  Your app is ready to be deployed! \
  See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
- `npm run eject`
  - **Note: this is a one-way operation. Once you `eject`, you can’t go back!**
  - If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
  - Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.
  - You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.