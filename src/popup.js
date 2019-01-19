function onoff(){
    var image = document.getElementById("imgOnOffButton");
    if(image.src == "img/on-off.png"){
        image.src = "img/on-off2.png";
        document.getElementById("h1id").textContent = "yourTextHere";
    } else {
        image.src = "img/on-off.png";
    }
}