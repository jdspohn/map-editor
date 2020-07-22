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

var formTitle = document.querySelector('#form-title');
var uploadTileset = document.querySelector('#upload-tileset');
var uploadForm = document.querySelector('#upload-form');
var uploadFormWindow = document.querySelector('#upload-form-window');
var uploadName = document.querySelector('#upload-name');
var uploadTileWidth = document.querySelector('#upload-tile-width');
var uploadTileHeight = document.querySelector('#upload-tile-height');
var uploadPaddingH = document.querySelector('#upload-padding-h');
var uploadPaddingV = document.querySelector('#upload-padding-v');
var uploadMarginLeft = document.querySelector('#upload-margin-left');
var uploadMarginRight = document.querySelector('#upload-margin-right');
var uploadMarginTop = document.querySelector('#upload-margin-top');
var uploadMarginBot = document.querySelector('#upload-margin-bot');
var uploadFormDelete = document.querySelector('#upload-form-delete');
var uploadFormAccept = document.querySelector('#upload-form-accept');
var numberInputs = document.querySelectorAll('.number-input');
var uploadInputs = document.querySelectorAll('#upload-form-options input');
var collapseButton = document.querySelectorAll('.collapse-button');
var collapsible = document.querySelectorAll('.collapsible');

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

let activeTileset;
let tilesetTitle = tilesetName.innerHTML;
tilePanelTop.addEventListener('click', function() {
    if(activeTileset !== undefined){
        if (tileMenu.hasAttribute('hidden')) {
            tilesetName.innerHTML = "Tile Menu<i class='fas fa-caret-right fa-lg arrow'></i>";
            tileMenu.removeAttribute('hidden');
        } else {
            tilesetName.innerHTML = tilesetTitle;
            tileMenu.setAttribute('hidden', true);
        }
    }
});

// ---------Tileset Upload Form--------- //

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

uploadTileset.addEventListener('change', function() {
    formTitle.innerHTML = "Upload Tileset";
    numberInputs.forEach(function(numberInput){
        numberInput.value = "";
    });
    uploadFormDelete.classList.add('hidden');
    previewUpload();
});

function previewUpload(image) {
    while(uploadFormWindow.firstChild) {
        uploadFormWindow.removeChild(uploadFormWindow.firstChild);
    }

    uploadInputs.forEach(function(input) {
        input.classList.remove('invalid');
    });

    // edit tileset //
    if (image !== undefined) {
        var tileset = image.file;
        uploadFormWindow.style.backgroundImage = "url('" + window.URL.createObjectURL(tileset) + "')";
        uploadName.value = image.name,
        uploadTileWidth.value = image.tileDimensions.tileWidth,
        uploadTileHeight.value = image.tileDimensions.tileHeight,
        uploadPaddingH.value = image.tileDimensions.tilePaddingH,
        uploadPaddingV.value = image.tileDimensions.tilePaddingV,
        uploadMarginLeft.value = image.tileDimensions.tileMarginLeft,
        uploadMarginRight.value = image.tileDimensions.tileMarginRight,
        uploadMarginTop.value = image.tileDimensions.tileMarginTop,
        uploadMarginBot.value = image.tileDimensions.tileMarginBot;

    // upload tileset //
    } else {
        var tileset = uploadTileset.files[0];
        if (validFileType(tileset)) {
            uploadFormWindow.style.backgroundImage = "url('" + window.URL.createObjectURL(tileset) + "')";
            uploadName.value = tileset.name;
        } else {
            alert("Not a valid file type. Only .jpg, .png, or .gif are accepted.");
        }
    }

    // display image dimensions //
    const uploadDimensions = new Image();
    uploadDimensions.src = window.URL.createObjectURL(tileset);
    uploadDimensions.onload = function() {
        var dimensions = document.createElement('span');
        dimensions.innerHTML = String(uploadDimensions.width + " x " + uploadDimensions.height);
        dimensions.classList.add('dimensions');
        uploadFormWindow.appendChild(dimensions);
    }

    collapsible.forEach(function(div){
        let hasValue = false;
        [...div.children].forEach(function(child) {
            if (~~child.value !== 0) {
                hasValue = true;
                console.log(child.value);
            }
        });
        div.toggleAttribute('hidden', !hasValue);
    });
    
    uploadForm.removeAttribute('hidden');
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
    uploadInputs.forEach(function(input) {
        input.classList.remove('invalid');
    });
    
    tilesets.forEach(function(tileset) {
        if (uploadName.value == tileset.name || uploadName.value == "" || uploadName.value == undefined){
            uploadName.classList.add('invalid');
            valid = false;
        }
    });
    
    numberInputs.forEach(function(numberInput){
        let NiV = numberInput.value;
        if (isNaN(NiV)) {
            numberInput.classList.add('invalid');
            valid = false;
        } else if (NiV == "" && numberInput.parentNode.id == 'tile-dimensions-input') {
            numberInput.classList.add('invalid');
            valid = false;
        } else if (NiV == "" && numberInput.parentNode.id !== 'tile-dimensions-input') {
            this.value = 0;
            numberInput.classList.remove('invalid');
        } else {
            numberInput.classList.remove('invalid');
        }
    });
    return valid;
}

collapseButton.forEach(function(button){
    button.addEventListener('mousedown', function(){
        button.parentElement.nextElementSibling.toggleAttribute('hidden');
    })
})

// --------Tileset Building-------- //

function populateTileset(file, newTileset) {
    var tileWidth = Number(uploadTileWidth.value);
    var tileHeight = Number(uploadTileHeight.value);
    var tilePaddingH = Number(uploadPaddingH.value);
    var tilePaddingV = Number(uploadPaddingV.value);
    var tileMarginLeft = Number(uploadMarginLeft.value);
    var tileMarginRight = Number(uploadMarginRight.value);
    var tileMarginTop = Number(uploadMarginTop.value);
    var tileMarginBot = Number(uploadMarginBot.value);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = tileWidth;
    canvas.height = tileHeight;

    var tileset = new Image();
        tileset.onload = function() {

            var columns = (((tileset.width - (tileMarginLeft + tileMarginRight)) + tilePaddingH) / (tileWidth + tilePaddingH));
            var rows = (((tileset.height - (tileMarginTop + tileMarginBot)) + tilePaddingV) / (tileHeight + tilePaddingV));

            for(var i = 0; i < rows; i++) {
                for(var j = 0; j < columns; j++) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const sx = tileMarginLeft + (j * (tileWidth + tilePaddingH)),
                          sy = tileMarginTop + (i * (tileHeight + tilePaddingV)),
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
                    newTileset.wrapper.appendChild(tile);
                }
            }
            // styling for tileset window in the case of overflow
            if (newTileset.wrapper.scrollHeight > newTileset.wrapper.clientHeight  || newTileset.wrapper.scrollWidth > newTileset.wrapper.clientWidth) {
                newTileset.wrapper.classList.add('tile-overflow');
            }
        };
        tileset.src = window.URL.createObjectURL(file);
}

function buildTileset() { 
    if (verifyInput()) {
        uploadForm.setAttribute('hidden', true);

        const newTilesetName = String(uploadName.value),
              newTilesetFile = uploadTileset.files[0],
              newTilesetTitle = newTilesetName + "<i class='fas fa-caret-right fa-lg arrow'></i>",
              tileDimensions = {
                tileWidth: Number(uploadTileWidth.value),
                tileHeight: Number(uploadTileHeight.value),
                tilePaddingH: Number(uploadPaddingH.value),
                tilePaddingV: Number(uploadPaddingV.value),
                tileMarginLeft: Number(uploadMarginLeft.value),
                tileMarginRight: Number(uploadMarginRight.value),
                tileMarginTop: Number(uploadMarginTop.value),
                tileMarginBot: Number(uploadMarginBot.value)
              };

        // create tileset wrapper div and label
        const wrapper = document.createElement('div'),
              label = document.createElement('label');

        wrapper.id = newTilesetName + '-ts';
        wrapper.classList.add('tile-panel-window-content');
        tilesetsContainer.appendChild(wrapper);

        label.innerHTML = newTilesetName + '<i class="fas fa-cog"></i>';
        label.classList.add('menu-item');
        tileMenu.appendChild(label);

        // updating tileset pane with this tile information
        tilesetTitle = newTilesetTitle;
        tilesetName.innerHTML = tilesetTitle;
        tileMenu.setAttribute('hidden', true);

        const newTileset = new Tileset(newTilesetFile, newTilesetName, tileDimensions, wrapper);
        tilesets.push(newTileset);
        activeTileset = newTileset;

        populateTileset(newTilesetFile, newTileset);
       
        window.onresize = function() {
            tilesets.forEach(function(tileset){
                if (tileset.wrapper.scrollHeight > tileset.wrapper.clientHeight  || tileset.wrapper.scrollWidth > tileset.wrapper.clientWidth) {
                    tileset.wrapper.classList.add('tile-overflow');
                } else {
                    tileset.wrapper.classList.remove('tile-overflow');
                }
            });
        };


        // add event listener for switching to this tileset from the menu
        label.addEventListener('click', function() {

            if (event.target.classList.contains('fa-cog')) {
                formTitle.innerHTML = "Edit Tileset";
                uploadFormDelete.classList.remove('hidden');
                previewUpload(newTileset);

                uploadFormDelete.addEventListener('click', function() {
                    if (newTileset == activeTileset) {
                        tilesetName.innerHTML = "Tile Menu<i class='fas fa-caret-right fa-lg arrow'></i>";
                        tileMenu.removeAttribute('hidden');
                        activeTileset = undefined;
                    }
                    tilesets.splice(tilesets.indexOf(newTileset), 1);
                    label.parentNode.removeChild(label);
                    wrapper.parentNode.removeChild(wrapper);
                    uploadForm.setAttribute('hidden', true);
                 });

            } else {
                // hide all tileset panes
                tilesets.forEach(function(tileset) {
                    tileset.wrapper.setAttribute('hidden', true);
                });

                activeTileset = newTileset;
                activeTileset.wrapper.removeAttribute('hidden');
                tileMenu.setAttribute('hidden', true);

                tilesetTitle = activeTileset.name + "<i class='fas fa-caret-right fa-lg arrow'></i>";
                tilesetName.innerHTML = tilesetTitle;

                if (wrapper.scrollHeight > wrapper.clientHeight  || wrapper.scrollWidth > wrapper.clientWidth) {
                    wrapper.classList.add('tile-overflow');
                } else {
                    wrapper.classList.remove('tile-overflow');
                }
            }
        });
        
        
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
