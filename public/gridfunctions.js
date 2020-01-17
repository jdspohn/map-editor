var map = document.getElementById("map");
var ctx = map.getContext("2d");

map.width = window.innerWidth / 4;
map.height = window.innerHeight / 4;

var img = new Image();
img.onload = function(){
    map.onclick = function(ev){
        var x = Math.floor(ev.clientX / 4);
        var y = Math.floor(ev.clientY / 4);
        ctx.drawImage(img, x-16, y-16);
    }
};
img.src= "/images/coldocean-tile2.png";

function grid(x){
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    for(i=0; i < map.height/x; i++){
        ctx.moveTo(0, 0);
        ctx.lineTo(0, i*x);
        ctx.lineTo(map.width, i*x);
    }
    for(i=0; i < map.width/x; i++){
        ctx.moveTo(0, 0);
        ctx.lineTo(i*x, 0);
        ctx.lineTo(i*x, map.height);
    }
    ctx.stroke();
}

grid(32);
grid(64);

console.log(window.innerHeight + " " + window.innerWidth);
console.log(screen.height + " " + screen.width);