import viewDefaultStyle from './view-default-style.js'

const textViewDefaultStyle = (function() {

    const textViewDefaultStyle = {
        ...viewDefaultStyle,
        "fillColor": "transparent",
        "strokeColor": "transparent",
        "textColor": "black",
        "fontFamily": "Arial",
        "fontSize": 32,
        "fontStyle": "normal",
        "textBaseline": "top"
    }

    return textViewDefaultStyle

})()

export default textViewDefaultStyle