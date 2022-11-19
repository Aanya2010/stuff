video="";
status="";
objects=[];

function preload(){
    video=createVideo('video.mp4');
    video.hide();
}

function setup() {
canvas=createCanvas(480, 380);
canvas.center()

}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status!=""){
        objectdet.detect(video, gotresults);
        for(i=0; i<objects.length; i++){
            document.getElementById("stat").innerHTML="status: objects detected";
            document.getElementById("obj").innerHTML="number of objects detected are: "+objects.length;
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}

function gotresults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function start(){
objectdet=ml5.objectDetector('cocossd', modelloaded);
document.getElementById("stat").innerHTML="status: Detecting objects"

}

function modelloaded(){
    console.log("hi its me ");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}