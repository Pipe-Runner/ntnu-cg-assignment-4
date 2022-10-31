# Scene Builder [CG Assignment 4]
This builder let's the user create and interact with basic shapes created using raw WebGL and Typescript. The source code has been developed in accordance to questions asked in CG Assignment 4.

## Setup
In project root:  
`npm install`

## Start Project
To start project:  
`npm run dev`  

Then your can open localhost as shown on the terminal. The port may differ!

## Source Map
Most of the UI has been made using react but the actual scene builder is pure TS. The code for the scene builder can be accessed in the `./src/lib` folder. In this, the object classes can be found in `./src/lib/objects`. I have used a few of my own helper functions that can be found in `./src/lib/utils`.  
I have written a thin React wrapper for the `SceneBuilder` class which can be found in `./src/components/react-scene`. This component has no relevant business logic and its only purpose is for creating a bridge between the React UI and the scene builder.