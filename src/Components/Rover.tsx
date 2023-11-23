import React, { useState } from 'react';

interface RoverProps{
    x:number,
    y:number,
    initialCardinal: string,
    intrusctions: string,
}


function Rover (this: any, roverProps :RoverProps )  {
    this.x = roverProps.x
    this.y = roverProps.y
    this.cardinal = roverProps.initialCardinal
    this.movingInstructions = roverProps.intrusctions


    this.turn = (direction:string) => {
        if (direction == 'L'){
            if (this.cardinal === 'N'){
                this.cardinal = 'W'
            }
            else if (this.cardinal === 'E'){
                this.cardinal = 'N'
            }
            else if (this.cardinal === 'S'){
                this.cardinal = 'E'
            }
            else if (this.cardinal === 'W'){
                this.cardinal = 'S'
            }           
        }
        else if (direction == 'R'){

            if (this.cardinal === 'N'){
                this.cardinal = 'E'
            }
            else if (this.cardinal === 'E'){
                this.cardinal = 'S'
            }
            else if (this.cardinal === 'S'){
                this.cardinal = ('W')
            }
            else if (this.cardinal === 'W'){
                this.cardinal = 'N'
            }           
        }
    }



    this.move = () => {
        if(this.cardinal === 'N'){
            this.y = this.y + 1          
            
        }
        else if(this.cardinal === 'E'){
            this.x = this.x + 1
        }
        else if(this.cardinal === 'S'){
            this.y = this.y - 1
        }
        else if(this.cardinal === 'W'){
            this.x = this.x - 1
        }
    }

    this.run = () => {
        for (let i=0; i < this.movingInstructions.length; i ++){
            if (this.movingInstructions[i] === 'L' ){
                this.turn('L')   
            }
            else if (this.movingInstructions[i] === 'R' ){
                this.turn('R') 
            }
            else if (this.movingInstructions[i] === 'M' ){
                this.move()
            }           
        }

    }
}



export default Rover;
