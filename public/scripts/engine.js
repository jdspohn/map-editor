class Engine {

    constructor() {
        this.step = 1000 / 20;
    }

    start() {
        let last,
            now = performance.now(),
            delta = this.step;

        const loop = (timestamp) => {
            this.frame = requestAnimationFrame(loop);

            last = now;
            now = timestamp;
            delta = delta + (now - last);

            app.render(delta);
        }
        this.frame = requestAnimationFrame(loop);
    }

    stop() {
        cancelAnimationFrame(this.frame);
        console.log("Engine stopped...");
    }

}