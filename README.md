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
    
    Run end-to-end test:
    ```
    node ./src/end-to-end-tests/TestRoboticRover.js; 
    ```

    5. **Run Unit Puppeteer Tests:**
    
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



