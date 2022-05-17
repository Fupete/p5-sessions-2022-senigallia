var cursor = false;

window.onload = (event) => {
  window.document.body.style.cursor = 'none';
  // console.log('page is fully loaded');
};


function showMouse() {
  console.log("showMouse");
  cursor = !cursor;
  if (cursor) {
    window.document.body.style.cursor = 'crosshair';
  } else {
    window.document.body.style.cursor = 'none';
  }
}

function switchFullscreen() {
  console.log("switchFullscreen");
  fs = false;

  if (document.fullscreenElement == null) {
    // Go fullscreen
    var element = document.querySelector("#canvas");
    element.requestFullscreen()
      .then(function() {
        // element has entered fullscreen mode successfully
      })
      .catch(function(error) {
        // element could not enter fullscreen mode
      });
    fs = true;
  } else {
    // Exit fullscreen
    document.exitFullscreen()
      .then(function() {
        // element has exited fullscreen mode
      })
      .catch(function(error) {
        // element could not exit fullscreen mode
        // error message
        console.log(error.message);
      });
    fs = false;
  }

}