import viewDefaultStyle from './view-default-style.js'

const imageViewDefaultStyle = (function() {

    const imageViewDefaultStyle = {
        ...viewDefaultStyle,
        "rotationAngle": 90,
        "counterClockwise": true,
        "cropped": false,
        "cropArea": { 
            "x": 0, 
            "y": 0, 
            "width": 0,
            "height": 0 
        },
    }

    return imageViewDefaultStyle

})()

export default imageViewDefaultStyle