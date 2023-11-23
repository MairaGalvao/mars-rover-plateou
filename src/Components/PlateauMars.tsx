import { Scatter } from "react-chartjs-2";
import  {  useEffect, useState } from 'react';

import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';



interface PlateauProps {
    x: number,
    y: number,
    initialCoordinates: any
    finalCoordinates: any
}
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const mapCardinalToAngle = (letter: any) => {
    if (letter === 'N') {
        return 0
    }
    else if (letter === 'E') {
        return 90
    }
    else if (letter === 'S') {
        return 180
    } else if (letter === 'W') {
        return 270
    }
}


function PlateauMars({ x, y, initialCoordinates, finalCoordinates }: PlateauProps) {

    const [startPoint, setStartPoint] = useState([])
    const [endPoint, setEndPoint] = useState([])

    useEffect(() => {
        const initialCoordinatesForScatter = initialCoordinates.map((obj: { initialValue: { roverX: any; roverY: any; cardinal: any; }; }) => {
            return {
                data: [{ x: obj.initialValue.roverX, y: obj.initialValue.roverY }],
                backgroundColor: 'pink',
                pointStyle: 'triangle',
                radius: 20,
                pointRotation: mapCardinalToAngle(obj.initialValue.cardinal)
            }

        })
        if (initialCoordinatesForScatter.length > 0) {
            setStartPoint(initialCoordinatesForScatter)
        }
    }, [initialCoordinates])


    useEffect(() => {
        const endCoordinatesForScatter = finalCoordinates.map((obj: { roverX: any; roverY: any; cardinal: any; }) => {
            return {
                data: [{ x: obj.roverX, y: obj.roverY }],
                backgroundColor: 'lightBlue',
                pointStyle: 'triangle',
                radius: 20,
                pointRotation: mapCardinalToAngle(obj.cardinal)
            }

        })
        if (endCoordinatesForScatter.length > 0) {
            setEndPoint(endCoordinatesForScatter)
        }
    }, [finalCoordinates])

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: y
            },
            x: {
                beginAtZero: true,
                max: x
            }
        },
    };
    const data = {
        datasets: startPoint.concat(endPoint)
    };



    return (

        <>
            
            {startPoint !== undefined && <Scatter options={options} data={data} />}
        </>
    )

}

export default PlateauMars;
