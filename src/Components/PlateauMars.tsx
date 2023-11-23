interface PlateauProps{
    x:number,
    y:number,
}


function PlateauMars(this: any, PlateauProps :PlateauProps) {

    this.x = Number(PlateauProps.x)
    this.y = Number(PlateauProps.y)



}

export default PlateauMars;
