class Tileset {
    constructor(file, name, tileDimensions, wrapper) {
        this.file = file;
        this.name = name;
        this.tileDimensions = tileDimensions;
        this.wrapper = wrapper;
    }
}


// new upload form //

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
//     previewUpload();
// });

// editTileset.addEventListener('click', function(event) {
//     // get the existing tileset

//     previewUpload(image)
// });

// function previewUpload(image) {
//     while(uploadFormWindow.firstChild) {
//         uploadFormWindow.removeChild(uploadFormWindow.firstChild);
//     }

//     // edit tileset //
//     if (image !== undefined) {
//         var tileset = image.file[0];
//         uploadFormWindow.style.backgroundImage = "url('" + window.URL.createObjectURL(tileset) + "')";
//         uploadName.value = image.tileDimensions.name,
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

//     uploadForm.removeAttribute('hidden');
// }