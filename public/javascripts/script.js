


// Initialize the photoData array with any previously uploaded photos from localStorage
const photoData = JSON.parse(localStorage.getItem('photoData')) || [{name: 'gallery', photos: []}];
 

// Get references to the form and ul elements
//console.log($('.my-selector:first-child'));


const addphotoForm=$('#add-photo');
const contactForm = $('#contact-me');
const ul = $('#list-photos');
displayPhotos();
const div =$('#collections');


const imageInput = document.querySelector("#photo-gallery");
const gallery = document.querySelector("#gallery");

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        const image = document.createElement("img");
        image.src = reader.result;
        gallery.appendChild(image);
    });

    if (file) {
        reader.readAsDataURL(file);
    }
});
// Add an event listener to the form's submit button
addphotoForm.on('submit', (e) => {
    console.log(e);
    e.preventDefault();
    const file = e.target.elements.photo.files[0];
    console.log(file)
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        const photo = {
            id: Date.now(),
            src: reader.result,
        }
        photoData[0].photos.push(photo);
        console.log(photoData);
        localStorage.setItem('photoData', JSON.stringify(photoData));
        displayPhotos();
    });

    reader.readAsDataURL(file);
});

contactForm.on('submit', (e)=>{
    e.preventDefault();
    alert('You have contacted me');
});

// Display the photos stored in photoData
function displayPhotos() {
    console.log('debug');
    ul.empty();
for(var n=0; n<photoData.length;n++) {
    photoData[n].photos.forEach((photo, index) => {
        const li = $('<li></li>');
        const img = $('<img>').attr('src', photo.src).attr('width', '100px').attr('height', '100px');
        const deleteButton = $('<button>Delete</button>');
        deleteButton.on('click', () => deletePhoto(index));
        const downloadButton = $('<button>Download</button>');
        downloadButton.on('click', () => downloadPhoto(photo.src));
        li.append(img, deleteButton, downloadButton);
        ul.append(li);
    });
}
    

}

// Call displayPhotos() to initially display any previously uploaded photos


// Delete a photo from photoData and localStorage
function deletePhoto(index) {
    photoData[0].photos.splice(index, 1);
    localStorage.setItem('photoData', JSON.stringify(photoData));
    displayPhotos();
}

// Download a photo from the gallery
function downloadPhoto(photoSrc) {
    // Create a temporary anchor element to download the photo
    const downloadLink = $('<a>').attr('href', photoSrc).attr('download', 'photo.jpg');
    downloadLink[0].click();
}

// Get a reference to the create collection form
const createCollectionForm = $('#create-collection-form');

// Handle form submission to create a new collection
createCollectionForm.on('submit', (event) => {
    event.preventDefault();
    const collectionName = event.target.elements['collection-name'].value;
    if (collectionName) {
        console.log(photoData);
        photoData.push({ name: collectionName, photos: [] });
        localStorage.setItem('photoData', JSON.stringify(photoData));
        event.target.reset();
        alert(`Collection "${collectionName}" created successfully!`);
    }
});

// Display the photos stored in photoData for a specific collection
function displayCollections(collectionName) {
    $(ul).empty();
    if (photoData) {
        const collection = photoData.find((c) => c.name === collectionName);
        if (collection) {
            console.log('collections')
            collection.photos.forEach((photo) => {
                // Create the li and img elements
                const li = $('<li></li>');
                const img = $('<img>').attr('src', photo.src);

                // Add a new download button to download the photo
                const downloadButton = $('<button>Download</button>');
                downloadButton.click(() => downloadPhoto(photo.src));

                // Add the download button to the li element
                li.append(img, downloadButton);

                // Add the li element to the ul element
                ul.append(li);
            });
        }
    }
}





