
// Using system web cam
navigator.getUserMedia = navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
  }

// Setecting all the tag from the HTML
 const video = document.querySelector('#video');
 const audio = document.querySelector('#audio');
 const canvas = document.querySelector('#canvas');
 const context = canvas.getContext('2d');
 let model;

 // creating a video from handtrack model

 handTrack.startVideo(video).then(status =>{
     if (status){
         navigator.getUserMedia({video: {}}, stream =>{ //  Passing all the web cam stream to video.
           video.srcObject = stream;
       setInterval(runDectection, 1000);
          // runDectection();
          },
         err => console.log (err)
         );
     }
 });

 function runDectection(){
     model.detect(video)
     .then(predections =>{  //  This will reatun a bunch of array of array detected from the camera stream.
          console.log (predections);
       //   model.renderPredictions(predections, canvas, context, video);
       if (predections.length > 0){
           audio.play();
       }
        requestAnimationFrame(runDectection);
     })
 }

//  Loading the hand track model
 handTrack.load(modelParams).then(lmodel =>{
   model = lmodel;
 });



