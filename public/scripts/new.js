// var html = document.querySelector('html');
// var panelTop = document.querySelector('#panel-top');
// var file = document.querySelector('#file');
// var fileMenu = document.querySelector('#file-menu');
// var view = document.querySelector('#view');
// var viewMenu = document.querySelector('#view-menu');

// var instruments = document.querySelectorAll('.instrument');

// const tilesetName = document.querySelector('#tileset-name');
// var tilePanelTop = document.querySelector('#tile-panel-top');
// var tileMenu = document.querySelector('#tile-menu');
// var tilePanelWindow = document.querySelector('#tile-panel-window');
// var tilesetsContainer = document.querySelector('#tilesets-container');
// var tilesets = [];

// var formTitle = document.querySelector('#form-title');
// var uploadTileset = document.querySelector('#upload-tileset');
// var uploadForm = document.querySelector('#upload-form');
// var uploadFormWindow = document.querySelector('#upload-form-window');
// var uploadName = document.querySelector('#upload-name');
// var uploadTileWidth = document.querySelector('#upload-tile-width');
// var uploadTileHeight = document.querySelector('#upload-tile-height');
// var uploadPaddingH = document.querySelector('#upload-padding-h');
// var uploadPaddingV = document.querySelector('#upload-padding-v');
// var uploadMarginLeft = document.querySelector('#upload-margin-left');
// var uploadMarginRight = document.querySelector('#upload-margin-right');
// var uploadMarginTop = document.querySelector('#upload-margin-top');
// var uploadMarginBot = document.querySelector('#upload-margin-bot');
// var uploadFormDelete = document.querySelector('#upload-form-delete');
// var uploadFormAccept = document.querySelector('#upload-form-accept');
// var numberInputs = document.querySelectorAll('.number-input');
// var uploadInputs = document.querySelectorAll('#upload-form-options input');
// var collapseButton = document.querySelectorAll('.collapse-button');
// var collapsible = document.querySelectorAll('.collapsible');

// var toolName = document.querySelector('#tool-name');
// var toolPanelTop = document.querySelector('#tool-panel-top');
// var toolMenu = document.querySelector('#tool-menu');
// var toolLabels = document.querySelectorAll('.tool-label');

// var tools = document.querySelectorAll('.tool');
// var minimap = document.querySelector('#minimap');
// var layers = document.querySelector('#layers');
// var animation = document.querySelector('#animation');

// // -------File, View------ //

// function closeMenu(event){
//     console.log(event.target);
//     if(event.target.id != 'file' && event.target.parentNode.id != 'file-menu'){
//         fileMenu.setAttribute('hidden', true);
//     }
//     if(event.target.id != 'view' && event.target.parentNode.id != 'view-menu'){
//         viewMenu.setAttribute('hidden', true);
//     }
// }

// html.addEventListener('mousedown', closeMenu);

// panelTop.addEventListener('mouseover', function(event) {
//     if (fileMenu.hasAttribute('hidden') == false) {
//         if (event.target.id == 'view') {
//             fileMenu.setAttribute('hidden', true);
//             viewMenu.toggleAttribute('hidden');
//         }
//     }
//     if (viewMenu.hasAttribute('hidden') == false) {
//         if (event.target.id == 'file') {
//             viewMenu.setAttribute('hidden', true);
//             fileMenu.toggleAttribute('hidden');
//         }
//     }
// })

// file.addEventListener('mousedown', function(event) {
//     viewMenu.setAttribute('hidden', true);
//     fileMenu.toggleAttribute('hidden');
// });

// view.addEventListener('mousedown', function(event) {
//     fileMenu.setAttribute('hidden', true);
//     viewMenu.toggleAttribute('hidden');
// });

// // --------Instrument Buttons-------- //

// instruments.forEach(function(button) {
//     button.addEventListener('mousedown', function(){
//         if (button.classList.contains('selected')) {
//             button.classList.remove('selected');
//         } else {
//             instruments.forEach(function(button) {
//                 button.classList.remove('selected');
//             });
//             button.classList.add('selected');
//         }
//     });
// });

// // --------Tile Panel--------- //

// let activeTileset;
// let activeTitle = tilesetName.innerHTML;
// function toggleTileMenu() {
//     if (activeTileset !== undefined) {
//         if (tileMenu.hasAttribute('hidden')) {
//             tilesetName.innerHTML = "Tile Menu<i class='fas fa-caret-right fa-lg arrow'></i>";
//             tileMenu.removeAttribute('hidden');
//         } else {
//             tilesetName.innerHTML = activeTitle;
//             tileMenu.setAttribute('hidden', true);
//         }
//     }
// }
// tilePanelTop.addEventListener('click', toggleTileMenu);

// // ---------Tileset Upload Form--------- //

// var fileTypes = [
//     'image/jpg',
//     'image/jpeg',
//     'image/png',
//     'image/gif'
//   ]
  
// function validFileType(file) {
//     for(var i = 0; i < fileTypes.length; i++) {
//       if(file.type === fileTypes[i]) {
//         return true;
//       }
//     }
  
//     return false;
// }

// uploadTileset.addEventListener('change', function() {
//     formTitle.innerHTML = "Upload Tileset";
//     numberInputs.forEach(function(numberInput){
//         numberInput.value = "";
//     });
//     uploadFormDelete.classList.add('hidden');
//     previewUpload();
// });

// function previewUpload(image) {
//     while(uploadFormWindow.firstChild) {
//         uploadFormWindow.removeChild(uploadFormWindow.firstChild);
//     }

//     uploadInputs.forEach(function(input) {
//         input.classList.remove('invalid');
//     });

//     // edit tileset //
//     if (image !== undefined) {
//         var tileset = image.file;
//         uploadFormWindow.style.backgroundImage = "url('" + window.URL.createObjectURL(tileset) + "')";
//         uploadName.value = image.name,
//         uploadTileWidth.value = image.tileDimensions.tileWidth,
//         uploadTileHeight.value = image.tileDimensions.tileHeight,
//         uploadPaddingH.value = image.tileDimensions.tilePaddingH,
//         uploadPaddingV.value = image.tileDimensions.tilePaddingV,
//         uploadMarginLeft.value = image.tileDimensions.tileMarginLeft,
//         uploadMarginRight.value = image.tileDimensions.tileMarginRight,
//         uploadMarginTop.value = image.tileDimensions.tileMarginTop,
//         uploadMarginBot.value = image.tileDimensions.tileMarginBot;

//     // upload tileset //
//     } else {
//         var tileset = uploadTileset.files[0];
//         if (validFileType(tileset)) {
//             uploadFormWindow.style.backgroundImage = "url('" + window.URL.createObjectURL(tileset) + "')";
//             uploadName.value = tileset.name;
//         } else {
//             alert("Not a valid file type. Only .jpg, .png, or .gif are accepted.");
//         }
//     }

//     // display image dimensions //
//     const uploadDimensions = new Image();
//     uploadDimensions.src = window.URL.createObjectURL(tileset);
//     uploadDimensions.onload = function() {
//         var dimensions = document.createElement('span');
//         dimensions.innerHTML = String(uploadDimensions.width + " x " + uploadDimensions.height);
//         dimensions.classList.add('dimensions');
//         uploadFormWindow.appendChild(dimensions);
//     }

//     collapsible.forEach(function(div){
//         let hasValue = false;
//         [...div.children].forEach(function(child) {
//             if (~~child.value !== 0) {
//                 hasValue = true;
//                 console.log(child.value);
//             }
//         });
//         div.toggleAttribute('hidden', !hasValue);
//     });
    
//     uploadForm.removeAttribute('hidden');
// }

// uploadForm.addEventListener('click', closeForm);
// function closeForm() {
//     if(event.target.classList.contains('close-form') || event.target.parentNode.classList.contains('close-form')) {
//         uploadForm.setAttribute('hidden', true);
//     }
// }

// uploadFormAccept.addEventListener('click', buildTileset);

// function verifyInput() {
//     let valid = true;
//     uploadInputs.forEach(function(input) {
//         input.classList.remove('invalid');
//     });
    
//     tilesets.forEach(function(tileset) {
//         if (uploadName.value == tileset.name || uploadName.value == "" || uploadName.value == undefined){
//             uploadName.classList.add('invalid');
//             valid = false;
//         }
//     });
    
//     numberInputs.forEach(function(numberInput){
//         let NiV = numberInput.value;
//         if (isNaN(NiV)) {
//             numberInput.classList.add('invalid');
//             valid = false;
//         } else if (NiV == "" && numberInput.parentNode.id == 'tile-dimensions-input') {
//             numberInput.classList.add('invalid');
//             valid = false;
//         } else if (NiV == "" && numberInput.parentNode.id !== 'tile-dimensions-input') {
//             this.value = 0;
//             numberInput.classList.remove('invalid');
//         } else {
//             numberInput.classList.remove('invalid');
//         }
//     });
//     return valid;
// }

// collapseButton.forEach(function(button){
//     button.addEventListener('mousedown', function(){
//         button.parentElement.nextElementSibling.toggleAttribute('hidden');
//     })
// })

// ---------------- //
// GLOBAL VARIABLES //
// ---------------- //

const html = document.querySelector('html');

// Panel Top: File, View //
const panelTop = document.querySelector('#panel-top'),
      file = document.querySelector('#file'),
      fileMenu = document.querySelector('#file-menu'),
      view = document.querySelector('#view'),
      viewMenu = document.querySelector('#view-menu');

// Instruments //
const instruments = document.querySelectorAll('.instrument');

// Tile Panel //
const tilePanelTop = document.querySelector('#tile-panel-top'),
      tilesetName = document.querySelector('#tileset-name'),
      tilePanelWindow = document.querySelector('#tile-panel-window'),
      tileMenu = document.querySelector('#tile-menu'),
      tilesetsContainer = document.querySelector('#tilesets-container'),
      tilesets = [];

// Tileset Upload Form //
const uploadTileset = document.querySelector('#upload-tileset');

const form = document.querySelector('#form'),
      formTitle = document.querySelector('#form-title'),
      formWindow = document.querySelector('#form-window'),
      formInputs = document.querySelectorAll('#form-options input'),
      numberInputs = document.querySelectorAll('.number-input'),
      collapseButton = document.querySelectorAll('.collapse-button'),
      collapsible = document.querySelectorAll('.collapsible'),
      formAccept = document.querySelector('#form-accept'),
      formDelete = document.querySelector('#form-delete');

const formName = document.querySelector('#form-name'),
      formTileWidth = document.querySelector('#form-tile-width'),
      formTileHeight = document.querySelector('#form-tile-height'),
      formPaddingH = document.querySelector('#form-padding-h'),
      formPaddingV = document.querySelector('#form-padding-v'),
      formMarginLeft = document.querySelector('#form-margin-left'),
      formMarginRight = document.querySelector('#form-margin-right'),
      formMarginTop = document.querySelector('#form-margin-top'),
      formMarginBot = document.querySelector('#form-margin-bot');

// Tool Panel //
const toolPanelTop = document.querySelector('#tool-panel-top'),
      toolName = document.querySelector('#tool-name'),
      toolMenu = document.querySelector('#tool-menu'),
      toolLabels = document.querySelectorAll('.tool-label');

const tools = document.querySelectorAll('.tool'),
      minimap = document.querySelector('#minimap'),
      layers = document.querySelector('#layers'),
      animation = document.querySelector('#animation');

// --------------------- //
// Panel Top: File, View //
// --------------------- //

// Close and Open Menus //
function closeMenu(event) {
    console.log(event.target);
    if(event.target.id != 'file' && event.target.parentNode.id != 'file-menu') {
        fileMenu.setAttribute('hidden', true);
    }
    if(event.target.id != 'view' && event.target.parentNode.id != 'view-menu') {
        viewMenu.setAttribute('hidden', true);
    }
}

html.addEventListener('mousedown', closeMenu);

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

// FILE MENU //
file.addEventListener('mousedown', function(event) {
    viewMenu.setAttribute('hidden', true);
    fileMenu.toggleAttribute('hidden');
});

// VIEW MENU //
view.addEventListener('mousedown', function(event) {
    fileMenu.setAttribute('hidden', true);
    viewMenu.toggleAttribute('hidden');
});

// ----------- //
// INSTRUMENTS //
// ----------- //

// Button Selection //
instruments.forEach(function(button) {
    button.addEventListener('mousedown', function() {
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
        } else {
            instruments.forEach(function(button) {
                button.classList.remove('selected');
            });
            button.classList.add('selected');
        }
    });
});

// ---------- //
// TILE PANEL //
// ---------- //

// Toggle Tile Menu //
let activeTileset,
    activeTitle = tilesetName.innerHTML;

function toggleTileMenu() {
    if (activeTileset !== undefined) {
        if (tileMenu.hasAttribute('hidden')) {
            tilesetName.innerHTML = "Tile Menu<i class='fas fa-caret-right fa-lg arrow'></i>";
            tileMenu.removeAttribute('hidden');
        } else {
            tilesetName.innerHTML = activeTitle;
            tileMenu.setAttribute('hidden', true);
        }
    }
}

tilePanelTop.addEventListener('click', toggleTileMenu);

// ------------ //
// TILESET FORM //
// ------------ //

// Image Upload Verification //
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

// Form Input Verification //
function verifyInput(tileset) {
    let valid = true;

    if (formName.value == "" || formName.value == undefined) {
        formName.classList.add('invalid');
        valid = false;
    } else {
        formName.classList.remove('invalid');
    }

    tilesets.forEach(function(tileset) {
        if (formName.value == tileset.name) {
            formName.classList.add('invalid');
            valid = false;
        }
    });

    if (tileset) {
        if (formName.value == tileset.name) {
            formName.classList.remove('invalid');
            valid = true;
        }
    }

    // test these ^^ when edit button is working

    numberInputs.forEach(function(numberInput) {
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

// Manually Collapse Padding and Margin Fields //
collapseButton.forEach(function(button) {
    button.addEventListener('mousedown', function() {
        button.parentElement.nextElementSibling.toggleAttribute('hidden');
    });
});

// SHOW FORM //
function showForm(image) {

    // Display Image Dimensions //
    const imageDimensions = new Image();
    imageDimensions.src = window.URL.createObjectURL(image);
    imageDimensions.onload = function() {
        const dimensions = document.createElement('span');
        dimensions.innerHTML = String(imageDimensions.width + " x " + imageDimensions.height);
        dimensions.classList.add('dimensions');
        formWindow.appendChild(dimensions);
    }

    // Collapse Padding or Margin Fields if All Values are Zero //
    collapsible.forEach(function(div){
        let hasValue = false;
        [...div.children].forEach(function(child) {
            if (~~child.value !== 0) {
                hasValue = true;
            }
        });
        div.toggleAttribute('hidden', !hasValue);
    });

    form.removeAttribute('hidden');
}

// CLOSE FORM //
function closeForm() {
    if (event.target.classList.contains('close-form') || event.target.parentNode.classList.contains('close-form')) {
        form.setAttribute('hidden', true);
    }
}
form.addEventListener('click', closeForm);

// CLEAR FORM //
function clearForm() {

    // remove old image and dimension text overlay
    while (formWindow.firstChild) {
        formWindow.removeChild(formWindow.firstChild);
    }

    // remove red borders around input fields
    formInputs.forEach(input => input.classList.remove('invalid'));
    
    // set input fields to blank
    numberInputs.forEach(input => input.value = '');
}

let isEditing = false,
    editingTileset;

// ADD TILESET //
function addTileset() {
    const image = uploadTileset.files[0];
    if (!validFileType(image)) {
        return alert("Not a valid file type. Only .jpg, .png, or .gif are accepted.");
    }

    isEditing = false;

    clearForm();
    formTitle.innerHTML = "Upload Tileset";
    formWindow.style.backgroundImage = "url('" + window.URL.createObjectURL(image) + "')";
    formDelete.classList.add('hidden');

    formName.value = image.name;

    showForm(image);
}

// test opening an edit form and uploading an invalid file type to see if it resets the values in the form

uploadTileset.addEventListener('change', addTileset);

// EDIT TILESET //
function editTileset(tileset) {
    clearForm();
    formTitle.innerHTML = "Edit Tileset";
    formWindow.style.backgroundImage = "url('" + window.URL.createObjectURL(tileset.file) + "')";
    formDelete.classList.remove('hidden');

    isEditing = true;
    editingTileset = tileset;

    formName.value        = tileset.name;
    formTileWidth.value   = tileset.tileDimensions.tileWidth;
    formTileHeight.value  = tileset.tileDimensions.tileHeight;
    formPaddingH.value    = tileset.tileDimensions.tilePaddingH;
    formPaddingV.value    = tileset.tileDimensions.tilePaddingV;
    formMarginLeft.value  = tileset.tileDimensions.tileMarginLeft;
    formMarginRight.value = tileset.tileDimensions.tileMarginRight;
    formMarginTop.value   = tileset.tileDimensions.tileMarginTop;
    formMarginBot.value   = tileset.tileDimensions.tileMarginBot;

    showForm(tileset.file);
}

// cog.addeventlistener('click', editTileset(tileset))

formAccept.addEventListener('click', function() {
    if (isEditing) {
        if (verifyInput(editingTileset)) {
            updateTileset(editingTileset);
        }
    } else {
        if (verifyInput()) {
            createTileset();
        }
    }
});

function createTileset() {
    // todo
}

function updateTileset(tileset) {
    tileset.name = formName.value;
    tileset.tileDimensions.tileWidth = Number(formTileWidth.value);
    tileset.tileDimensions.tileHeight = Number(formTileHeight.value);
    tileset.tileDimensions.tilePaddingH = Number(formPaddingH.value);
    tileset.tileDimensions.tilePaddingV = Number(formPaddingV.value);
    tileset.tileDimensions.tileMarginLeft = Number(formMarginLeft.value);
    tileset.tileDimensions.tileMarginRight = Number(formMarginRight.value);
    tileset.tileDimensions.tileMarginTop = Number(formMarginTop.value);
    tileset.tileDimensions.tileMarginBot = Number(formMarginBot.value);

    populateTileset(tileset.file, tileset);
    uploadForm.setAttribute('hidden', true);
}

// --------Tileset Building-------- //

function populateTileset(file, tileset) {
    var tileWidth = tileset.tileDimensions.tileWidth;
    var tileHeight = tileset.tileDimensions.tileHeight;
    var tilePaddingH = tileset.tileDimensions.tilePaddingH;
    var tilePaddingV = tileset.tileDimensions.tilePaddingV;
    var tileMarginLeft = tileset.tileDimensions.tileMarginLeft; 
    var tileMarginRight = tileset.tileDimensions.tileMarginRight;
    var tileMarginTop = tileset.tileDimensions.tileMarginTop;
    var tileMarginBot = tileset.tileDimensions.tileMarginBot;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = tileWidth;
    canvas.height = tileHeight;

    // clear wrapper incase we're using new edited values
    tileset.wrapper.innerHTML = '';

    var img = new Image();
        img.onload = function() {

            var columns = (((img.width - (tileMarginLeft + tileMarginRight)) + tilePaddingH) / (tileWidth + tilePaddingH));
            var rows = (((img.height - (tileMarginTop + tileMarginBot)) + tilePaddingV) / (tileHeight + tilePaddingV));

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
                    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);

                    const tile = document.createElement('div');
                    tile.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';
                    tile.classList.add('tile');
                    tileset.wrapper.appendChild(tile);
                }
            }
            // styling for tileset window in the case of overflow
            if (tileset.wrapper.scrollHeight > tileset.wrapper.clientHeight  || tileset.wrapper.scrollWidth > tileset.wrapper.clientWidth) {
                tileset.wrapper.classList.add('tile-overflow');
            }
        };
        img.src = window.URL.createObjectURL(file);
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
        activeTitle = newTilesetTitle;
        tilesetName.innerHTML = activeTitle;
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

                activeTitle = activeTileset.name + "<i class='fas fa-caret-right fa-lg arrow'></i>";
                tilesetName.innerHTML = activeTitle;

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
