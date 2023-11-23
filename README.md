# Mars Rover Application

This project provides an interactive simulation of robotic rovers on Mars. Users have the flexibility to dynamically choose the size of the rectangular plateau, define the initial X and Y coordinates for the rover's landing position, and input string instructions. The application visually represents the rover's initial and final positions on a graph, showcasing the trajectory based on the provided instructions.

The user can interactively select the size of the rectangular plateau, providing flexibility in the simulation.
Initial X and Y coordinates and cardinal points for the rover's landing position can be chosen interactively, allowing for a customized starting point.
String instructions input by the user are graphically represented, displaying both the initial and final positions of the rover.

## Getting Started

Follow these steps to run the Mars Rover application on your local machine:

1. **Clone the Repository:**
   ```bash
   git clone <https://github.com/MairaGalvao/mars-rover-plateou
   cd client

2. **Install dependencies:**
    ```
    npm install
    ```

    Run app:
    ```
    npm start
    ```
    This will start the development server, and you can access the application in your browser   
    at  http://localhost:3000.

    3. **Interact with the Application:**

    Open the application in your browser and follow the on-screen instructions to input plateau  
    size and rover data.
    The application allows you to define the size of the plateau and the landing position and 
    instructions for each rover.

    4. **Run end-to-end Puppeteer Tests:**

   The end-to-end test (TestRoboticRover.js) automates user interactions with the Mars Rover 
   application using Puppeteer.It sets plateau size, rover's initial position, and instructions, 
   then verifies the final position displayed on the page, ensuring the UI functions correctly in 
   response to user input.
    
    Run end-to-end test:
    ```
    node ./src/end-to-end-tests/TestRoboticRover.js; 
    ```

    5. **Run Unit Puppeteer Tests:**

   Unit Test (TestRoboticRoverFunct.js):
   The unit test (TestRoboticRoverFunct.js) focuses on specific functionality within the 
   application, assessing the behavior of UI elements after certain actions. It interacts with 
   the user interface by inputting values, clicking buttons, and evaluating the resulting state, 
   ensuring the expected behavior is reflected.
    
    Run Unit test:
    ```
    node ./src/unit-tests/TestRoboticRoverFunct.js; 
    ```

    **Project Structure**
    src/
    App.js: Main application component.
    src/
    components/
    RoboticRover.js: Component for user input.
    Plateau.js: Component for displaying rovers on the plateau.
    end-to-end-tests/
    TestRoboticRover.js: End-to-end Puppeteer tests.

    unit-tests/
    TestRoboticRoverFunct.js: Unit Puppeteer tests.

    **Additional Notes**
    The application uses Javascript-React for the user interface.
    HTML and CSS were utilized for simple and structured styling of the user interface.
    Chart.js is employed for visualizing rover positions on the plateau.
    Puppeteer is used for end-to-end and unit testing.


   **remove below part or not??? 

   **Edge cases taken care**
   src/components/Plateau.tsx

   **Plateau Size**
   1. The application checks if the X and Y dimension are not filled. 
   2. The application checks if the X and Y values are negative.
   3. The application checks if the X and Y values are numerical.

   **Rover's initial coordinates** 
   4. The application checks if the X and Y dimension and landing are not filled. 
   5. The application verifies that the X and Y coordinates are greater than or equal to the 
   specified Plateau dimensions.
   6. The application verifies that the X and Y coordinates are numerical.
   7. The application verifies that the landing direction are N, E, S or W.

   **Rover's instructions** 
   8. The application checks the instructions are not filled. 
   9. The application verifies that the instructions are L, R or M.

   **Form**
   10. The application moves back to add another Rover's instead of the initial size form - 
   assuming the user wants to add another Rover


   **Edge cases NOT taken care**
   
   **Form**
   11. The user must refresh the page in case she/he wants to add another size of Plateau
   12. The user must reset all the information in case to add new rovers
   13. The user must verify to not add Rover's in the exact same location
   14. The user must verify not to add more rover's than the actual amount of points
   15. Unit test - or e2e test to see if all final results are being displayed 
   16. Inputs should not be separated. 
   17. Display all the final positions
   18. multiple rovers instead of one 
   19. add screenshots of test in the right directory
   20. make sure all strings are capitalletter

   **EXTRAS**

