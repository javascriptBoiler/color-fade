##### features
- fade between two colors
- scatter fade steps as your wanted.
- get color of the specific point

##### How is it works


    const fadeColor = require('color-fade')
    const startingColor = "#66cdaa"
    const endingColor = "#ffffff"
    const numberOfSteps = 5
    
    const color = await fadeColor(startingColor, endingColor, numberOfSteps)
    // [ '#66cdaa', '#8cdabf', '#b3e6d5', '#d9f3ea', '#ffffff' ]
    

you can get specific point color code


    const fadeColor = require('color-fade')
    const startingColor = "#66cdaa"
    const endingColor = "#ffffff"
    const numberOfSteps = 5
    const selectColorAt = 3
    
    const color = await fadeColor(startingColor, endingColor, numberOfSteps, selectColorAt)
    //'#b3e6d5'

specify output type
- default it will return as hex


    const fadeColor = require('color-fade')
    const startingColor = "#66cdaa"
    const endingColor = "#ffffff"
    const numberOfSteps = 5
    const selectColorAt = 3
    const format = 'hex' // 'rgb' 
    
    const color = await fadeColor(startingColor, endingColor, numberOfSteps, selectColorAt, format)
    //'#b3e6d5'
