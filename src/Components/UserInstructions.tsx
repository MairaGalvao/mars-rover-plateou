function UserInstructions() {

  return (
    <>


      <div>
        <h1 className='main-title'>Plateau Mars</h1>

        <h2>Instructions</h2>
        <ol>
          <li>Enter the upper-right coordinates of the plateau.</li>
          <li>For each rover:</li>
          <ul>
            <li>Specify the landing position (x, y, position(cardinal)).</li>
            <li>Provide instructions using 'L', 'R', and 'M'.</li>
            <li>Click "Add" to deploy the rover on the plateau.</li>

            <li>Note: You can add multiple rovers</li>

          </ul>
          <li>After adding all rovers, click "Run Rovers" to see their final positions displayed in the Plateau .</li>
        </ol>
      </div></>
  )


}

export default UserInstructions