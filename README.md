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
    node ./src/TestRoboticRover.js; 
    ```


    **Project Structure**
    src/
    App.js: Main application component.
    src/
    components/
    Main.tsx: The main component
    Rover.js: Component for user input.
    PlateauMars.tsx: Component for displaying rovers on the plateau.

    end-to-end-tests/
    TestRoboticRover.js: End-to-end Puppeteer tests.



    **Additional Notes**
    The application uses Javascript-React for the user interface.
    HTML and CSS were utilized for simple and structured styling of the user interface.
    Chart.js is employed for visualizing rover positions on the plateau.
    Puppeteer is used for end-to-end and unit testing.


   **Edge cases taken care**
   src/components/PlateauMars.tsx

   **Plateau & Rover inputs** 

   **Plateau Size**
   1. The application checks if the X and Y dimension are not filled - with disable button. 
   2. The application checks if the X and Y values are negative - with disable button.
   3. The application checks if the X and Y values are numerical - with disable button.

   **Rover's initial coordinates** 
   4. The application checks if the X and Y dimension and landing are not filled. 
   5. The application verifies that the X and Y coordinates are greater than or equal to the 
   specified Plateau dimensions.
   6. The application verifies that the X and Y coordinates are numerical.
   7. The application verifies that the landing direction are N, E, S or W.

   **Rover's instructions** 
   8. The application checks the instructions are not filled. 
   9. The application verifies that the instructions are L, R or M.


   **Edge cases NOT taken care**
   
   **Form**
   10. The user must refresh the page in case she/he wants to add another size of Plateau
   11. The user must reset all the information in case to add new rovers
   12. The user must verify to not add Rover's in the exact same location
   13. The user must verify not to add more rover's than the actual amount of points
   14. Unit test - or e2e test to see if all final results are being displayed 
   15. Display all the final positions
   16. add screenshots of test


