class Text {
    
    constructor(txt, x, y) {
        this.txt = txt
        this.x = x
        this.y = y
        this.font = {
            style: '',
            size: 1.8,
            family: 'sans-serif'
        }
    }
    
    draw(ctx) {
        
        ctx.font = `${ this.font.style } ${ this.font.size }rem ${ this.font.family }`
        ctx.textBaseline = 'top'
        
        ctx.fillText(this.txt, this.x, this.y)
        
    }
    
}