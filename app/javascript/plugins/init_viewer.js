import Viewer from 'viewerjs';
// You should import the CSS file.
import 'viewerjs/dist/viewer.css';

// View an image
const initViewer = () => {
  const selector = document.getElementById('image');
  if (selector) {
    const viewer = new Viewer(selector, {
      modal: true,
      viewed() {
        // viewer.zoomTo(1);
      },
    });
  }
}

export { initViewer }
// Then, show the image by click it, or call `viewer.show()`.
  
  // View a list of images
  // const gallery = new Viewer(document.getElementById('images'));
  // Then, show one image by click it, or call `gallery.show()`.