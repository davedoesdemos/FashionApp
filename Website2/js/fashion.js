var moving = false;
var startX = 0;
var topcard = 1;
var activeCard = "card1";

window.addEventListener('DOMContentLoaded', pageFirstLoad, false);

function pageFirstLoad() {
    setProductCard1();
    setProductCard2();
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("touchstart", onMouseDown);
}
async function getProduct() {
    // Default options are marked with *
    const response = await fetch("https://prod2-14.swedencentral.logic.azure.com/workflows/a1a299d5324348fa900f7614a564678e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RuJ9a0HFopoPwAA4iYEUNRL8qpkCkKIP96WN-wz1tOo", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    });
    //const data = await response.json();
    return response.json(); // parses JSON response into native JavaScript objects
}
async function setProductCard1() {
    const newProduct = await getProduct();
    document.getElementById("card1ImageBox").innerHTML = "                    <img class=\"cardImage\" id=\"image1\" src=\"" + newProduct.imageLocation + "\" />";
    document.getElementById("card1Text").innerHTML = newProduct.Description;
}
async function setProductCard2() {
    const newProduct = await getProduct();
    document.getElementById("card2ImageBox").innerHTML = "                    <img class=\"cardImage\" id=\"image2\"  src=\"" + newProduct.imageLocation + "\" />";
    document.getElementById("card2Text").innerHTML = newProduct.Description;
}
function onMouseDown(e) {
    if (moving) return;
    startX = e.pageX;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onMouseMove);
    document.addEventListener("touchend", onMouseUp);
    return true;
}

function onMouseMove(e) {
    deltaX = e.pageX - startX;
    if (!deltaX) return;

    makeChange(deltaX);
}

function makeChange(deltaX) {
    moving = true;
    deg = deltaX / 15;
    opacity = 1-(Math.abs(deltaX/3) / 100);
   // document.getElementById("title").innerHTML = deltaX; //debug
    document.getElementById(activeCard).style.rotate = deg + "deg";
    document.getElementById(activeCard).style.opacity = opacity;
    document.getElementById(activeCard).style.transform = "translateX(" + deltaX + "px)";
    if (deltaX > 0) {
        //like
        document.getElementById(activeCard).style.backgroundColor = "green";
    } else if (deltaX < 0) {
        //dislike
        document.getElementById(activeCard).style.backgroundColor = "red";
    };
}

function onMouseUp(e) {
    moving=false;
    document.removeEventListener("mousemove", onMouseMove);
    document.getElementById(activeCard).style.rotate = 0 + "deg";
    document.getElementById(activeCard).style.opacity = 1;
    document.getElementById(activeCard).style.transform = "translateX(" + 0 + "px)";
    document.getElementById(activeCard).style.backgroundColor = "black";
    if (Math.abs(deltaX) > 100) {
        //reset everything and flip the cards
        if (topcard == 1) {
            document.getElementById("card1").style.zIndex = 1;
            setProductCard1();
            document.getElementById("card2").style.zIndex = 2;
            topcard = 2;
            activeCard = "card2";
        } else {
            document.getElementById("card1").style.zIndex = 2;
            setProductCard2();
            document.getElementById("card2").style.zIndex = 1;
            topcard = 1;
            activeCard = "card1";
        }
        
    };
}
