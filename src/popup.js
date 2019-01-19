function onoff(){
    var image = document.getElementById("imgOnOffButton");
    if(image.src == "img/on-off.png"){
        image.src = "img/on-off2.png";
    } else {
        image.src = "img/on-off.png";
    }
}