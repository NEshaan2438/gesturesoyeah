Webcam.set({
    width: 350,
    height: 300,
    png_quality: 100,
    image_format: "png"
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function capture() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='capturedImg' src='" + data_uri + "'>";
    })
}

console.log("ML5 Version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/FT7k67xyD/model.json", modelReady);

function modelReady() {
    console.log("Model loaded :D");
}

function speakNow(pred) {
    var synth = window.speechSynthesis;

    speakData = "The hand gesture is " + pred;
    
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        prediction1 = results[0].label;
        document.getElementById("pred1").innerHTML = prediction1;
        if (prediction1 == "Hand") {
            document.getElementById("emoji1").innerHTML = "&#9995;"
        } else if (prediction1 == "Fist") {
            document.getElementById("emoji1").innerHTML = "&#128074;"
        } else if (prediction1 == "Two Fingers") {
            document.getElementById("emoji1").innerHTML = "&#9996;"
        }
        speakNow(prediction1);
    }
}

function predict() {
    classifier.classify(document.getElementById("capturedImg"), gotResults);
}