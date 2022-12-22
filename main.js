img = "";
objects = [];
status = "";

function preload() {
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500,500);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
}

function modelLoaded() {
    console.log("Cargando el Modelo...");
    status = "true";
}

function gotResult(error,result) {
    if (error) {
        console.log("error")
    } else {
        objects = result;
        console.log(result);
    }
}

function draw() {
    image(video,0,0,500,500);
    if (status =! "") {
        r = random(150);
        g = random(150);
        b = random(150);
        objectDetector.detect(video,gotResult);
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("estado").innerHTML = "Estado: Completado";
            document.getElementById("objetos").innerHTML = "Objetos Detectados: " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill(); stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
}