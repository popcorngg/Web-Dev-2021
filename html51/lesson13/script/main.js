var canvas, ctx;
var video;

function init() {
    // Get the canvas and obtain a context for
    // drawing in it
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext('2d');
    video = document.getElementById("myVideo");
}

function snapshot() {
    // Draws current image from the video element into the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function onSuccess(stream) {
    var output = document.getElementById('myVideo');
    output.src = window.URL.createObjectURL(stream);
}

function onError() {
    // getUserMedia API not supported, or another application is using the webcam!
}
if (navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia)) {
    navigator.getUserMedia({ video: true }, onSuccess, onError);
} else {
    alert("getUserMedia API not supported");
}