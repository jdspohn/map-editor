// map {
    // skel = nested arrays. this will be provided to the developer when they choose to export their map
        // the first array will indicate the layer of the map [layer1, layer2]
        // the second array will indicate the row of the layer [row1, row2]
        // the third array will indicate the tile placement in the row [grass, water]
        // ex map.skel = [ [ [grass, grass], [water, water] ], [ [grass, grass] ] ]  
        // ^^^ this skeleton would indicate a 2x2 square with water on the bottom and a 2 layer high grass cliff beside it
    // build = a function for the website to interpret the map skeleton and display it on the canvas by calling map.build
    // dimensions = information about the size of each tile to place them appropriately when calling the build function
// }

class Application {

    constructor(canvas, activeTile, img) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.map = [];

        this.activeTile = activeTile;
        this.img = img;

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


        // render mouse tile
        if (this.activeTile && this.mouse.x != undefined) {
            this.ctx.save();
            this.ctx.filter = 'grayscale(100%) brightness(150%)';
            this.ctx.drawImage(this.img, this.mouse.x, this.mouse.y);
            this.ctx.restore();
        }

    }

}