class ContextDelegate {
    
    constructor(canvas) {

        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Error: arg passed is not a <canvas>')
        }
        
        this.context = canvas.getContext('2d')

        this.renderer = new Renderer(this)
        
    }
    
    get canvas() {
        return this.context.canvas
    }

    fillRect(x, y, width, height) {
        this.context.fillRect(x, y, width, height)
    }

    strokeRect(x, y, width, height) {
        this.context.strokeRect(x, y, width, height)
    }

    clearRect(x, y, width, height) {
        this.context.clearRect(x, y, width, height)
    }

    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }

    beginPath() {
        this.context.beginPath()
    }

    moveTo(x, y) {
        this.context.moveTo(x, y)
    }

    lineTo(x, y) {
        this.context.lineTo(x, y)
    }

    arc(x, y, radius, startAngle, endAngle, counterclockwise = false) {
        this.context.arc(x, y, radius, startAngle, endAngle, counterclockwise)
    }

    arcTo(x1, y1, x2, y2, radius) {
        this.context.arcTo(x1, y1, x2, y2, radius)
    }

    quadraticCurveTo(cpx, cpy, x, y) {
        this.context.quadraticCurveTo(cpx, cpy, x, y)
    }

    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
    }

    closePath() {
        this.context.closePath()
    }

    stroke() {
        this.context.stroke()
    }

    fill() {
        this.context.fill()
    }

    fillText(text, x, y, maxWidth) {
        this.context.fillText(text, x, y, maxWidth)
    }

    strokeText(text, x, y, maxWidth) {
        this.context.strokeText(text, x, y, maxWidth)
    }

    measureText(text) {
        return this.context.measureText(text)
    }

    translate(x, y) {
        this.context.translate(x, y)
    }

    rotate(angle) {
        this.context.rotate(angle)
    }

    scale(x, y) {
        this.context.scale(x, y)
    }

    setTransform(a, b, c, d, e, f) {
        this.context.setTransform(a, b, c, d, e, f)
    }

    resetTransform() {
        this.context.resetTransform()
    }

    save() {
        this.context.save()
    }

    restore() {
        this.context.restore()
    }

    set shadowColor(color) {
        this.context.shadowColor = color
    }

    get shadowColor() {
        return this.context.shadowColor
    }

    set shadowBlur(value) {
        this.context.shadowBlur = value
    }

    get shadowBlur() {
        return this.context.shadowBlur
    }

    set shadowOffsetX(value) {
        this.context.shadowOffsetX = value
    }

    get shadowOffsetX() {
        return this.context.shadowOffsetX
    }

    set shadowOffsetY(value) {
        this.context.shadowOffsetY = value
    }

    get shadowOffsetY() {
        return this.context.shadowOffsetY
    }

    set lineWidth(value) {
        this.context.lineWidth = value
    }

    get lineWidth() {
        return this.context.lineWidth
    }

    set lineCap(style) {
        this.context.lineCap = style
    }

    get lineCap() {
        return this.context.lineCap
    }

    set lineJoin(style) {
        this.context.lineJoin = style
    }

    get lineJoin() {
        return this.context.lineJoin
    }

    set miterLimit(value) {
        this.context.miterLimit = value
    }

    get miterLimit() {
        return this.context.miterLimit
    }

    set fillStyle(config) {
        this.context.fillStyle = config
    }

    get fillStyle() {
        return this.context.fillStyle
    }

    set strokeStyle(config) {
        this.context.strokeStyle = config
    }

    get strokeStyle() {
        return this.context.strokeStyle
    }

}

