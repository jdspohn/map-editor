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


// Manually Collapse Padding and Margin Fields //
collapseButton.forEach(function(button) {
    button.addEventListener('mousedown', function() {
        button.parentElement.nextElementSibling.toggleAttribute('hidden');
    });
});

// CLEAR FORM //
function clearForm() {
    while(formWindow.firstChild) {
        formWindow.removeChild(formWindow.firstChild);
    }
    formInputs.forEach(function(input) {
        input.classList.remove('invalid');
    });
}

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

// ADD TILESET //
function addTileset() {

    clearForm();
    numberInputs.forEach(function(numberInput){
        numberInput.value = "";
    });

    formTitle.innerHTML = "Upload Tileset";

    let image = uploadTileset.files[0];
        if (validFileType(image)) {
            formWindow.style.backgroundImage = "url('" + window.URL.createObjectURL(image) + "')";
            formName.value = image.name;
        } else {
            alert("Not a valid file type. Only .jpg, .png, or .gif are accepted.");
        }

    formDelete.classList.add('hidden');
    showForm(image);
}

uploadTileset.addEventListener('change', addTileset);

// EDIT TILESET //
function editTileset(tileset) {

    clearForm();
    let image = tileset.file;
        formWindow.style.backgroundImage = "url('" + window.URL.createObjectURL(image) + "')";
        formName.value = tileset.name,
        formTileWidth.value = tileset.tileDimensions.tileWidth,
        formTileHeight.value = tileset.tileDimensions.tileHeight,
        formPaddingH.value = tileset.tileDimensions.tilePaddingH,
        formPaddingV.value = tileset.tileDimensions.tilePaddingV,
        formMarginLeft.value = tileset.tileDimensions.tileMarginLeft,
        formMarginRight.value = tileset.tileDimensions.tileMarginRight,
        formMarginTop.value = tileset.tileDimensions.tileMarginTop,
        formMarginBot.value = tileset.tileDimensions.tileMarginBot;
    formDelete.classList.remove('hidden');
    showForm(image);
}

// cog.addeventlistener('click', editTileset(tileset))