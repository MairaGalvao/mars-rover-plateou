# Mars Rover Application

This project provides an interactive simulation of robotic rovers on Mars. Users have the flexibility to dynamically choose the size of the rectangular plateau, define the initial X and Y coordinates for the rover's landing position, and input string instructions. The application visually represents the rover's initial and final positions on a graph, showcasing the trajectory based on the provided instructions.

The user can interactively select the size of the rectangular plateau, providing flexibility in the simulation.
Initial X and Y coordinates and cardinal points for the rover's landing position can be chosen interactively, allowing for a customized starting point.
String instructions input by the user are graphically represented, displaying both the initial and final positions of the rover.

## Getting Started

Follow these steps to run the Mars Rover application on your local machine:

1. **Clone the Repository:
   ```bash
   git clone <https://github.com/MairaGalvao/mars-rover-plateou
   cd client

2. ## Install dependencies:
    ```
    npm install
    ```

    Run app:
    ```
    npm start
    ```
    This will start the development server, and you can access the application in your browser   
    at  http://localhost:3000.

    ## Product decision: 
    ***What happens if the Rover exits the Plateau?***

     If in any move of the Rover it exits the Plateau, the Rover's run stops. 

## Interact with the Application: 

    Open the application in your browser and follow the on-screen instructions to input plateau  
    size and rover data.
    The application allows you to define the size of the plateau and the landing position and 
    instructions for each rover.

## Run end-to-end Puppeteer Tests:

   The end-to-end test (TestRoboticRover.js) automates user interactions with the Mars Rover 
   application using Puppeteer.It sets plateau size, rover's initial position, and instructions, 
   then verifies the final position displayed on the page, ensuring the UI functions correctly in 
   response to user input.
    
    Run end-to-end test:
    ```
    node ./src/testRoboticRover.js; 
    ```

   ## Usage Example 
   ### Example 1
   INPUT:
   - Plateau size: 20 20
   - Landing Pos: 1 2 N 
   - Instruction: LMLMLMLMM 
   OUTPUT:
   - Final Position: 1 3 N

   ### Example 2   
   INPUT:
   - Plateau size: 20 20
   - Landing Position: 3 3 E 
   - Instruction: MRRMMRMRRM 
   OUTPUT:
   - Final Position: 2 3 S

    ## Project Structure
      ├── Main
      │   ├── Rover  | Responsible for operating the Rovers object according to the instructions
      │   ├── Plateau | Responsible for displaying the Plateau and Rover Data dynamically  
      │   ├── UserInstructions | Responsible for displaying the interface instructions for the user  



    ## Technologies stack
    The application uses Javascript-React for the user interface.
    HTML and CSS were utilized for simple and structured styling of the user interface.
    Chart.js is employed for visualizing rover positions on the plateau graphcally.
    Puppeteer is used for end-to-end testing.


   ## Edge cases

   ### Plateau Size 
   1. In case the X or Y dimension are not filled - "Set Plateau" button is disabled.
   2. In case the X or Y values are negative - "Set Plateau" button is disabled.
   3. In case the X or Y values are not numerical - "Set Plateau" button is disabled.

   ### Rover's initial coordinates
   4. In case the X or Y dimension and cardinal are not filled - "Add" button is disabled. 
   5. In case the X or Y coordinates are greater than the Plateau dimensions - "Add" button is disabled.
   6. In case the X or Y coordinates are not numerical - "Add" button is disabled.
   7. In case the landing direction is not N, E, S or W - "Add" button is disabled.

   ### Rover's instructions
   8. In case the instructions are not filled - "Add" button shuold be disabled. TODO
   9. In case the instructions are not on of L, R or M - "Add" button shuold be disabled. TODO



