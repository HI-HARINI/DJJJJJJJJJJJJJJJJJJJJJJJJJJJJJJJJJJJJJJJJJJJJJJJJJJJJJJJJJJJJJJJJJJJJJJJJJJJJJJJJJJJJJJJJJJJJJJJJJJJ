song=" "
function preload(){
    song=loadSound("music.mp3")
}
rwx=0
rwy=0
lwx=0
lwy=0
srw=0
slw=0
function setup(){
    canvas=createCanvas(600,600)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    posenet=ml5.poseNet(video,modelLoaded)
    posenet.on('pose',gotPoses)
}
function modelLoaded(){
    console.log("postnetisinitialized")
}
function gotPoses(results){
    if(results.length>0){
        srw=results[0].pose.keypoints[10].score
        slw=results[0].pose.keypoints[9].score
        rwx=results[0].pose.rightWrist.x
        rwy=results[0].pose.rightWrist.y
        lwx=results[0].pose.leftWrist.x
        lwy=results[0].pose.leftWrist.y
    }
}
function draw(){
    image(video,0,0,600,600)
    fill("blue")
    stroke("white")
    if(srw>0.2){
        circle(rwx,rwy,20)
        if(rwy>0&&rwy<100){
            document.getElementById("speed").innerHTML="speed=0.5x"
            song.rate(0.5)
        }
        if(rwy>100&&rwy<200){
            document.getElementById("speed").innerHTML="speed=1x"
            song.rate(1)
        }
        if(rwy>200&&rwy<300){
            document.getElementById("speed").innerHTML="speed=1.5x"
            song.rate(1.5)
        }
        if(rwy>300&&rwy<400){
            document.getElementById("speed").innerHTML="speed=2x"
            song.rate(2)
        }
        if(rwy>400&&rwy<500){
            document.getElementById("speed").innerHTML="speed=2.5x"
            song.rate(2.5)
        }
    }
    if(slw>0.2){
        circle(lwx,lwy,20);
        In=Number(lwy)
        nlwy=floor(In*2)
        lwyd=nlwy/1000
        document.getElementById("v").innerHTML="v="+lwyd
        song.setVolume(lwyd)
    }
}
function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}