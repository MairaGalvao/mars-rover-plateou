
interface RoverProps {
    x: number,
    y: number,
    initialCardinal: string,
    intrusctions: string,
    xPlateau: string,
    yPlateau: string

}

function Rover(this: any, roverProps: RoverProps) {
    this.x = Number(roverProps.x)
    this.y = Number(roverProps.y)
    this.cardinal = roverProps.initialCardinal
    this.movingInstructions = roverProps.intrusctions
    this.plateauSizeX = roverProps.xPlateau
    this.plateauSizeY = roverProps.yPlateau

    this.turn = (direction: string) => {
        if (direction == 'L') {
            if (this.cardinal === 'N') {
                this.cardinal = 'W'
            }
            else if (this.cardinal === 'E') {
                this.cardinal = 'N'
            }
            else if (this.cardinal === 'S') {
                this.cardinal = 'E'
            }
            else if (this.cardinal === 'W') {
                this.cardinal = 'S'
            }
        }
        else if (direction == 'R') {

            if (this.cardinal === 'N') {
                this.cardinal = 'E'
            }
            else if (this.cardinal === 'E') {
                this.cardinal = 'S'
            }
            else if (this.cardinal === 'S') {
                this.cardinal = ('W')
            }
            else if (this.cardinal === 'W') {
                this.cardinal = 'N'
            }
        }
    }


    this.move = () => {
        if (this.cardinal === 'N') {
            this.y = this.y + 1
        }
        else if (this.cardinal === 'E') {
            this.x = this.x + 1
        }
        else if (this.cardinal === 'S') {
            this.y = this.y - 1
        }
        else if (this.cardinal === 'W') {
            this.x = this.x - 1
        }

        const exceededPlateau = this.x > this.plateauSizeX || this.y > this.plateauSizeY || this.x < 0 || this.y < 0
        if (exceededPlateau) {
            console.log("Rover exceeded Plateau")
            return false
        }
        return true
    }

    this.run = () => {
        console.log("running rover ", this.x, this.y, this.cardinal)
        for (let i = 0; i < this.movingInstructions.length; i++) {
            const currentInstruction = this.movingInstructions[i]
            if (currentInstruction === 'L') {
                this.turn('L')
            }
            else if (currentInstruction === 'R') {
                this.turn('R')
            }
            else if (currentInstruction === 'M') {
                const isWithinPlateau = this.move()
                if (!isWithinPlateau){
                    return false
                }
            }
        }
        return true
    }

}



export default Rover;
