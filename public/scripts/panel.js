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
    if(event.target.classList.contains('close-form') || event.target.parentNode.classList.contains('close-form')) {
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

// CREATE TILESET //
function createTileset() {
    const newTilesetName = String(formName.value),
          newTilesetFile = uploadTileset.files[0],
          newTilesetTitle = newTilesetName + "<i class='fas fa-caret-right fa-lg arrow'></i>",
          tileDimensions = {
              tileWidth: Number(formTileWidth.value),
              tileHeight: Number(formTileHeight.value),
              tilePaddingH: Number(formPaddingH.value),
              tilePaddingV: Number(formPaddingV.value),
              tileMarginLeft: Number(formMarginLeft.value),
              tileMarginRight: Number(formMarginRight.value),
              tileMarginTop: Number(formMarginTop.value),
              tileMarginBot: Number(formMarginBot.value)
          };
    
    // create tileset wrapper div and label
    const wrapper = document.createElement('div'),
          label = document.createElement('label');

    wrapper.classList.add('tile-panel-window-content');
    tilesetsContainer.appendChild(wrapper);

    label.innerHTML = newTilesetName + '<i class="fas fa-cog"></i>';
    label.classList.add('menu-item');
    tileMenu.appendChild(label);

    activeTitle = newTilesetTitle;
    tilesetName.innerHTML = activeTitle;
    tileMenu.setAttribute('hidden', true);

    const newTileset = new Tileset(newTilesetFile, newTilesetName, tileDimensions, wrapper, label);
    tilesets.push(newTileset);
    activeTileset = newTileset;

    populateTileset(newTilesetFile, newTileset);
    form.setAttribute('hidden', true);

    // add event listener for switching to this tileset from the menu
    label.addEventListener('click', function() {

        if (event.target.classList.contains('fa-cog')) {
            editTileset(newTileset);
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

formDelete.addEventListener('click', function() {
    if (newTileset == activeTileset) {
        tilesetName.innerHTML = "Tile Menu<i class='fas fa-caret-right fa-lg arrow'></i>";
        tileMenu.removeAttribute('hidden');
        activeTileset = undefined;
    }
    tilesets.splice(tilesets.indexOf(newTileset), 1);
    label.parentNode.removeChild(label);
    wrapper.parentNode.removeChild(wrapper);
    form.setAttribute('hidden', true);
 });

 
 window.onresize = function() {
    tilesets.forEach(function(tileset){
        if (tileset.wrapper.scrollHeight > tileset.wrapper.clientHeight  || tileset.wrapper.scrollWidth > tileset.wrapper.clientWidth) {
            tileset.wrapper.classList.add('tile-overflow');
        } else {
            tileset.wrapper.classList.remove('tile-overflow');
        }
    });
};

// UPDATE TILESET //
function updateTileset(tileset) {
    tileset.name = String(formName.value);
    tileset.tileDimensions.tileWidth = Number(formTileWidth.value);
    tileset.tileDimensions.tileHeight = Number(formTileHeight.value);
    tileset.tileDimensions.tilePaddingH = Number(formPaddingH.value);
    tileset.tileDimensions.tilePaddingV = Number(formPaddingV.value);
    tileset.tileDimensions.tileMarginLeft = Number(formMarginLeft.value);
    tileset.tileDimensions.tileMarginRight = Number(formMarginRight.value);
    tileset.tileDimensions.tileMarginTop = Number(formMarginTop.value);
    tileset.tileDimensions.tileMarginBot = Number(formMarginBot.value);
    tileset.label.innerHTML = tileset.name + '<i class="fas fa-cog"></i>';

    populateTileset(tileset.file, tileset);
    uploadForm.setAttribute('hidden', true);
}

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