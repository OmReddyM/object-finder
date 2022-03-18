Status = "";
userObject = "";
objects = [];
function setup(){
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video, 0, 0, 600, 400);
    if (Status !== "") {
        objectDetector.detect(video, gotResult);
        for (let index = 0; index < objects.length; index++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = floor(objects[index].confidence * 100);
            text(objects[i].label + " - " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == userObject) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("objectFound").innerHTML = userObject + " has been found!";
                synth = SpeechSynthesis;
                utterance = new SpeechSynthesisUtterance(userObject + " has been found!");
                synth.speak(utterance);
            } else {
                document.getElementById("objectFound").innerHTML = userObject + " not found";
            }
        }
    }    
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    userObject = document.getElementById("input").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    Status = true;
}