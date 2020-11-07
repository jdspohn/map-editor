// app {
    // map = nested arrays. this will be provided to the developer when they choose to export their map
        // the first array will indicate the layer of the map [layer1, layer2]
        // the second array will indicate the row of the layer [row1, row2]
        // the third array will indicate the tile placement in the row [grass, water]
        // ex app.map = [ [ [grass, grass], [water, water] ], [ [grass, grass] ] ]  
        // ^^^ this map would indicate a 2x2 square with water on the bottom and a 2 layer high grass cliff beside it
    // render() = a function for the website to interpret the map and display it on the canvas by calling app.render()
// }

// grid dimensions - check when a tileset is created if there are any existing tilesets. if there are not, the dimensions 
    // of that tileset will be inherited. save the dimensions as variables that can be passed to app.render in the form of 
    //this.dimensions in the app constructor

class Application {

    constructor(canvas, activeTile, img, activeGrid, tw, th) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.map = [];

        this.activeTile = activeTile;
        this.img = img;

        this.activeGrid = activeGrid;
        this.tw = tw;
        this.th = th;

        this.mouse = {
            x: undefined,
            y: undefined
        }

        this.timePassed = 0;
    }

    render(delta) {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // render map
        // this.map.render();

        // render grid
        if (this.activeGrid) {
            this.showGrid(this.tw, this.th);
        }

        // render mouse tile
        if (this.activeTile && this.mouse.x != undefined) {
            this.ctx.save();
            this.ctx.filter = 'grayscale(100%) brightness(150%)';
            this.ctx.drawImage(this.img, this.mouse.x, this.mouse.y);
            this.ctx.restore();
        }

    }

    showGrid(tw, th) {
        this.ctx.lineWidth = 1.0;
        this.ctx.beginPath();
        for (let i=0; i < (this.canvas.height)/th; i++) {
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(0, i*th);
            this.ctx.lineTo(this.canvas.width, i*th)
        }
        for (let i=0; i < (this.canvas.width)/th; i++) {
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(i*tw, 0);
            this.ctx.lineTo(i*tw, this.canvas.height)
        }
        this.ctx.stroke();
    }

}