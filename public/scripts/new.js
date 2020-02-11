var html = document.querySelector('html');
var panelTop = document.querySelector('#panel-top');
var file = document.querySelector('#file');
var fileMenu = document.querySelector('#file-menu');
var view = document.querySelector('#view');
var viewMenu = document.querySelector('#view-menu');

var buttons = document.querySelectorAll('.button');

var tilesetName = document.querySelector('#tileset-name');
var tilePanelTop = document.querySelector('#tile-panel-top');
var tileMenu = document.querySelector('#tile-menu');
var tilePanelWindow = document.querySelector('#tile-panel-window');
var tilesetsContainer = document.querySelector('#tilesets-container');
var tilesets = [];

var uploadTileset = document.querySelector('#upload-tileset');
var uploadForm = document.querySelector('#upload-form');
var uploadFormWindow = document.querySelector('#upload-form-window');
var uploadName = document.querySelector('#upload-name');
var uploadTileWidth = document.querySelector('#upload-tile-width');
var uploadTileHeight = document.querySelector('#upload-tile-height');
var uploadPaddingH = document.querySelector('#upload-padding-h');
var uploadPaddingV = document.querySelector('#upload-padding-v');
var uploadMarginH = document.querySelector('#upload-margin-h');
var uploadMarginV = document.querySelector('#upload-margin-v');
var uploadFormAccept = document.querySelector('#upload-form-accept');
var numberInputs = document.querySelectorAll('.number-input');
var uploadInputs = document.querySelectorAll('#upload-form-options input');

var toolName = document.querySelector('#tool-name');
var toolPanelTop = document.querySelector('#tool-panel-top');
var toolMenu = document.querySelector('#tool-menu');
var toolLabels = document.querySelectorAll('.tool-label');

var tools = document.querySelectorAll('.tool');
var minimap = document.querySelector('#minimap');
var layers = document.querySelector('#layers');
var animation = document.querySelector('#animation');

// -------File, View------ //

function closeMenu(event){
    console.log(event.target);
    if(event.target.id != 'file' && event.target.parentNode.id != 'file-menu'){
        fileMenu.setAttribute('hidden', true);
    }
    if(event.target.id != 'view' && event.target.parentNode.id != 'view-menu'){
        viewMenu.setAttribute('hidden', true);
    }
}

html.addEventListener('mousedown', function(event){
    closeMenu(event);
});

panelTop.addEventListener('mouseover', function(event) {
    if (fileMenu.hasAttribute('hidden') == false) {
        if (event.target.id == 'view') {
            fileMenu.setAttribute('hidden', true);
            viewMenu.toggleAttribute('hidden');
        }
    }
    if (viewMenu.hasAttribute('hidden') == false) {
        if (event.target.id == 'file') {
            viewMenu.setAttribute('hidden', true);
            fileMenu.toggleAttribute('hidden');
        }
    }
})

file.addEventListener('mousedown', function(event) {
    viewMenu.setAttribute('hidden', true);
    fileMenu.toggleAttribute('hidden');
});

view.addEventListener('mousedown', function(event) {
    fileMenu.setAttribute('hidden', true);
    viewMenu.toggleAttribute('hidden');
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

let tilesetTitle = tilesetName.innerHTML;
tilePanelTop.addEventListener('click', function() {
    if(tilesetsContainer.firstChild){
        if (tileMenu.hasAttribute('hidden')) {
            tilesetName.innerHTML = "Tile Menu<i class='fas fa-caret-right fa-lg arrow'></i>";
            tileMenu.removeAttribute('hidden');
        } else {
            tilesetName.innerHTML = tilesetTitle;
            tileMenu.setAttribute('hidden', true);
        }
    }
});

var fileTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif'
  ]
  
function validFileType(file) {
    for(var i = 0; i < fileTypes.length; i++) {
      if(file.type === fileTypes[i]) {
        return true;
      }
    }
  
    return false;
  }

uploadTileset.addEventListener('change', previewUpload);
function previewUpload() {
    while(uploadFormWindow.firstChild) {
        uploadFormWindow.removeChild(uploadFormWindow.firstChild);
    }
    var tileset = uploadTileset.files[0];
    if (validFileType(tileset)){
        uploadForm.removeAttribute('hidden');
        uploadFormWindow.style.backgroundImage = "url('" + window.URL.createObjectURL(tileset) + "')";
        uploadName.value = tileset.name;
    } else {
        alert("Not a valid file type. Only .jpg, .png, or .gif are accepted.")
    }
    
}

uploadForm.addEventListener('click', closeForm);
function closeForm() {
    if(event.target.classList.contains('close-form') || event.target.parentNode.classList.contains('close-form')) {
        uploadForm.setAttribute('hidden', true);
    }
}

uploadFormAccept.addEventListener('click', buildTileset);

function verifyInput() {
    let valid = true;
    if (uploadName.value == "" || uploadName.value == undefined){
        uploadName.classList.add('invalid');
        valid = false;
    } else {
        uploadName.classList.remove('invalid');
    }
    numberInputs.forEach(function(numberInput){
        let NiV = numberInput.value;
        if (isNaN(NiV) || NiV == "") {
            numberInput.classList.add('invalid');
            valid = false;
        } else {
            numberInput.classList.remove('invalid');
        }
    });
    return valid;
}

function populateTileset(file, newTileset){
    var tileWidth = Number(uploadTileWidth.value);
    var tileHeight = Number(uploadTileHeight.value);
    var tilePaddingH = Number(uploadPaddingH.value);
    var tilePaddingV = Number(uploadPaddingV.value);
    var tileMarginH = Number(uploadMarginH.value)
    var tileMarginV = Number(uploadMarginV.value)

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = tileWidth;
    canvas.height = tileHeight;

    var tileset = new Image();
        tileset.onload = function() {
            var columns = (((tileset.width - (tileMarginH * 2)) + tilePaddingH) / (tileWidth + tilePaddingH));
            var rows = (((tileset.height - (tileMarginV * 2)) + tilePaddingV) / (tileHeight + tilePaddingV));

            for(var i = 0; i < rows; i++){
                for(var j = 0; j < columns; j++){
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const sx = tileMarginH + (j * (tileWidth + tilePaddingH)),
                          sy = tileMarginV + (i * (tileHeight + tilePaddingV)),
                          sw = tileWidth,
                          sh = tileHeight,
                          dx = 0,
                          dy = 0,
                          dw = sw,
                          dh = sh;
                    ctx.drawImage(tileset, sx, sy, sw, sh, dx, dy, dw, dh);

                    const tile = document.createElement('div');
                    tile.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';
                    tile.classList.add('tile');
                    newTileset.appendChild(tile);
                }
            }
        };
        tileset.src = window.URL.createObjectURL(file);
}

function buildTileset() { 
    if (verifyInput()) {
        uploadForm.setAttribute('hidden', true);
        
        let newTileset = document.createElement('div');
        newTileset.id = String(uploadName.value) + "-ts";
        newTileset.classList.add('tile-panel-window-content');
        tilesetsContainer.appendChild(newTileset);

        let newTilesetLabel = document.createElement('label');
        newTilesetLabel.classList.add('menu-item');
        newTilesetLabel.innerHTML = String(uploadName.value);
        tileMenu.appendChild(newTilesetLabel);

        tilesetName.innerHTML = uploadName.value + "<i class='fas fa-caret-right fa-lg arrow'></i>";
        tilesetTitle = tilesetName.innerHTML;

        tileMenu.setAttribute('hidden', true);

        newTilesetLabel.addEventListener('click', function(){
            tilesets.forEach(function(tileset){
                tileset.setAttribute('hidden', true);
            });
            newTileset.removeAttribute('hidden');
            tileMenu.setAttribute('hidden', true);
            tilesetName.innerHTML = String(newTileset.id.slice(0, (newTileset.id.length - 3))) + "<i class='fas fa-caret-right fa-lg arrow'></i>"
            tilesetTitle = tilesetName.innerHTML;
        });

        tilesets.push(newTileset);
        populateTileset(uploadTileset.files[0], newTileset);
    }
}

// --------Tool Panel--------- //

let toolTitle = toolName.innerHTML;
toolPanelTop.addEventListener('click', function() {
    if (toolMenu.hasAttribute('hidden')) {
        toolName.innerHTML = "Tool Menu<i class='fas fa-caret-right fa-lg arrow'></i>";
        toolMenu.removeAttribute('hidden');
    } else {
        toolName.innerHTML = toolTitle;
        toolMenu.setAttribute('hidden', true);
    }
});

toolLabels.forEach(function(label, arrayIndex) {
    label.addEventListener('click', function(event) {
        tools.forEach(function(tool) {
            tool.setAttribute('hidden', true);
        });
        tools[arrayIndex].removeAttribute('hidden');
        toolMenu.setAttribute('hidden', true);
        toolName.innerHTML = toolLabels[arrayIndex].textContent + "<i class='fas fa-caret-right fa-lg arrow'></i>"
        toolTitle = toolName.innerHTML;
    });
});
