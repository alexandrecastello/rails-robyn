import Viewer from 'viewerjs';
// You should import the CSS file.
import 'viewerjs/dist/viewer.css';


const selectImage = (selector) => {
  const viewer = new Viewer(selector, {
    modal: true,
    viewed() {
      // viewer.zoomTo(1);
    },
  });
}

// View an image
const initViewer = () => {
  const selector = document.getElementById('image');
  if (selector) {
    selectImage(selector);
  }
}



const checkImage = (elements) => {
  elements.forEach((element) => {
    element.addEventListener('click', () => {
      const myInterval = setInterval(() => {
        const selector = document.getElementById('spotted_image');
        if(selector) {
          selectImage(selector);
          clearInterval(myInterval);
        }
      }, 100);
    })
  });
}


const checkExist = () => { 
  const myInterval = setInterval(() => {
  const elements = document.querySelectorAll('.marker');
  if (elements.length > 0) {
      checkImage(elements);
    clearInterval(myInterval);
    }
  }, 100);
};


export { initViewer, checkExist }






// Then, show the image by click it, or call `viewer.show()`.
  
  // View a list of images
  // const gallery = new Viewer(document.getElementById('images'));
  // Then, show one image by click it, or call `gallery.show()`.