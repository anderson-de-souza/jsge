import viewDefaultStyle from './view-default-style.js'

const imageViewDefaultStyle = {
    ...viewDefaultStyle,
    "rotationAngle": 90,
    "anticlockwise": true,
    "cropped": false,
    "cropArea": { 
        "x": 0, 
        "y": 0, 
        "width": 0,
        "height": 0 
    },
}

export default imageViewDefaultStyle