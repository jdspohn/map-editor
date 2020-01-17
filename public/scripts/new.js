var html = document.querySelector('html');
var panelTop = document.querySelector('#panel-top');
var file = document.querySelector('#file');
var fileMenu = document.querySelector('#file-menu');
var view = document.querySelector('#view');
var viewMenu = document.querySelector('#view-menu');

var buttons = document.querySelectorAll('.button');

var tilePanelTop = document.querySelector('#tile-panel-top');
var tileMenu = document.querySelector('#tile-menu');

var tool = document.querySelector('#tool');
var toolPanelTop = document.querySelector('#tool-panel-top');
var toolMenu = document.querySelector('#tool-menu');
var menuItems = document.querySelectorAll('.menu-item');
var minimap = document.querySelector('#minimap');
var layers = document.querySelector('#layers');
var animation = document.querySelector('#animation');

// -------File, View------ //

function closeMenu(event){
    console.log(event.target);
    if(event.target.id != 'file' && event.target.parentNode.id != 'file-menu'){
        fileMenu.setAttribute("hidden", true);
    }
    if(event.target.id != 'view' && event.target.parentNode.id != 'view-menu'){
        viewMenu.setAttribute("hidden", true);
    }
}

html.addEventListener('mousedown', function(event){
    closeMenu(event);
});

panelTop.addEventListener('mouseover', function(event) {
    if (fileMenu.hasAttribute('hidden') == false) {
        if (event.target.id == 'view') {
            fileMenu.setAttribute("hidden", true);
            viewMenu.toggleAttribute("hidden");
        }
    }
    if (viewMenu.hasAttribute('hidden') == false) {
        if (event.target.id == 'file') {
            viewMenu.setAttribute("hidden", true);
            fileMenu.toggleAttribute("hidden");
        }
    }
})

file.addEventListener('mousedown', function(event) {
    viewMenu.setAttribute("hidden", true);
    fileMenu.toggleAttribute("hidden");
});

view.addEventListener('mousedown', function(event) {
    fileMenu.setAttribute("hidden", true);
    viewMenu.toggleAttribute("hidden");
});

// --------Tool Buttons-------- //

buttons.forEach(function(button) {
    button.addEventListener('mousedown', function(){
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
        } else {
            buttons.forEach(function(button) {
                button.classList.remove('selected');
            });
            button.classList.add('selected');
        }
    });
});

// --------Tile Panel--------- //

tilePanelTop.addEventListener('click', function() {
    tileMenu.toggleAttribute("hidden");
});

// --------Tool Panel--------- //

let toolTitle = tool.innerHTML;
toolPanelTop.addEventListener('click', function() {
    if (toolMenu.hasAttribute("hidden")) {
        tool.innerHTML = "Tool Menu<i class='fas fa-caret-down fa-lg arrow'></i>";
        toolMenu.removeAttribute("hidden");
    } else {
        tool.innerHTML = toolTitle;
        toolMenu.setAttribute("hidden", true);
    }
});

menuItems.forEach(function(menuItem) {
    menuItem.addEventListener('click', function(event) {
        if (menuItem.parentNode.id == 'tool-menu') {
            if (event.target.id == 'tool-menu-minimap') {
                minimap.removeAttribute('hidden');
                layers.setAttribute('hidden', true);
                animation.setAttribute('hidden', true);
                tool.innerHTML = "Minimap<i class='fas fa-caret-right fa-lg arrow'></i>";
                toolTitle = tool.innerHTML;
            }
            if (event.target.id == 'tool-menu-layers') {
                layers.removeAttribute('hidden');
                minimap.setAttribute('hidden', true);
                animation.setAttribute('hidden', true);
                tool.innerHTML = "Layers<i class='fas fa-caret-right fa-lg arrow'></i>";
                toolTitle = tool.innerHTML;
            }
            if (event.target.id == 'tool-menu-animation') {
                animation.removeAttribute('hidden');
                minimap.setAttribute('hidden', true);
                layers.setAttribute('hidden', true);
                tool.innerHTML = "Animation<i class='fas fa-caret-right fa-lg arrow'></i>";
                toolTitle = tool.innerHTML;
            }
            toolMenu.setAttribute("hidden", true);
        }
        // if(menuItem.parentNode.id == 'tile-menu') {
        // }    
    });
});