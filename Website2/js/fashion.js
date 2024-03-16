var moving = false;
var startX = 0;
var topcard = 1;

window.addEventListener('DOMContentLoaded', pageFirstLoad, false);

function pageFirstLoad() {
    setProductCard1();
    setProductCard2();
    document.addEventListener("mousedown", onMouseDown);
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
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("touchend", onMouseUp);
    return true;
}

function onMouseMove(e) {
    deltaX = e.pageX - startX;
    if (!deltaX) return;
    if (Math.abs(deltaX) > 100) {
        //reset everything and flip the cards
    };
    makeChange(deltaX);
}

function makeChange(deltaX) {
    moving = true;
    deg = deltaX / 10;
    opacity = 1-(Math.abs(deltaX) / 100);
    document.getElementById("card1").style.rotate = deg + "deg";
    document.getElementById("card1").style.opacity = opacity;
    document.getElementById("card1").style.transform = "translateX(" + deltaX + "px)";
}

function onMouseUp(e) {
    moving=false;
    document.removeEventListener("mousemove", onMouseMove);
    document.getElementById("card1").style.rotate = 0 + "deg";
    document.getElementById("card1").style.opacity = 1;
    document.getElementById("card1").style.transform = "translateX(" + 0 + "px)";
}
