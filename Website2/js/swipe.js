//variables
var moving = false; //prevents mousedown while moving
var startX = 0; //The start position of the cursor or touch to measure distance moved
var activeCard = "card1"; //The currently active card which is on top with Z-index 2

//Set up on load events
window.addEventListener('DOMContentLoaded', pageFirstLoad, false);

async function pageFirstLoad() {
    setProductCard1();
    setProductCard2();
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("touchstart", onMouseDown);
    userInfo = await getUserInfo();
    if (userInfo.clientPrincipal != null) {
        document.getElementById("loginbox").innerHTML = userInfo.clientPrincipal.userDetails + " <a href=\"/.auth/logout\">(Logout)</a>";
    } else {
        document.getElementById("loginbox").innerHTML = "<a href=\"/.auth/login/aadb2c\">Login</a>";
    }
}

//Get a new random product from the catalogue API
async function getProduct() {
    const response = await fetch("https://prod2-14.swedencentral.logic.azure.com/workflows/a1a299d5324348fa900f7614a564678e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RuJ9a0HFopoPwAA4iYEUNRL8qpkCkKIP96WN-wz1tOo", {
      method: "GET", 
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

//Set product card 1 with a new product
async function setProductCard1() {
    const newProduct = await getProduct();
    document.getElementById("card1ImageBox").innerHTML = "                    <img class=\"cardImage\" id=\"image1\" src=\"" + newProduct.imageLocation + "\" />";
    document.getElementById("card1Text").innerHTML = newProduct.Description;
}

//set product card 2 with a new product
async function setProductCard2() {
    const newProduct = await getProduct();
    document.getElementById("card2ImageBox").innerHTML = "                    <img class=\"cardImage\" id=\"image2\"  src=\"" + newProduct.imageLocation + "\" />";
    document.getElementById("card2Text").innerHTML = newProduct.Description;
}

//Mouse and touch events
//The following code is for the swipe effect on the cards
function onMouseDown(e) {
    //sets up the swipe movement
    deltaX = 0; //reset distance moved to prevent clicks swapping cards immediately
    if (moving) return; //is already swiping, ignore
    startX = e.pageX; //get the start position of the cursor
    //add event listeners for move and mouseup to enable the swipe and end the swipe
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onMouseMove);
    document.addEventListener("touchend", onMouseUp);
}

function onMouseMove(e) {
    //animates the card movement when swiping
    deltaX = e.pageX - startX; //how far have we moved left and right
    if (!deltaX) return; //ignore if no movement
    moving = true; //we are now swiping so prevent mousedown actions

    //rotate and move the card
    deg = deltaX / 15; //rotation amount, more rotation the further we move
    opacity = 1-(Math.abs(deltaX/3) / 100); //fade out the card as we move
   // document.getElementById("title").innerHTML = deltaX; //debug, show the deltax in the title
    document.getElementById(activeCard).style.rotate = deg + "deg"; //rotate the card
    document.getElementById(activeCard).style.opacity = opacity; //fade out the card
    document.getElementById(activeCard).style.transform = "translateX(" + deltaX + "px)";//move the card with the mouse or finger
    //change the background color of the card based on the direction of the swipe
    if (deltaX > 0) {
        document.getElementById(activeCard).style.backgroundColor = "lightgreen"; //light green for like
    } else if (deltaX < 0) {
        document.getElementById(activeCard).style.backgroundColor = "lightcoral"; //light red for dislike
    };
}

function onMouseUp(e) {
    //remove the event listeners for move and mouseup then reset for the next go
    moving=false;
    document.removeEventListener("mousemove", onMouseMove);
    document.getElementById(activeCard).style.rotate = 0 + "deg";
    document.getElementById(activeCard).style.opacity = 1;
    document.getElementById(activeCard).style.transform = "translateX(" + 0 + "px)";
    document.getElementById(activeCard).style.backgroundColor = "black";
    if (Math.abs(deltaX) > 100) {
        //reset everything and flip the cards
        if (activeCard == "card1") {
            document.getElementById("card1").style.zIndex = 1;
            setProductCard1();
            document.getElementById("card2").style.zIndex = 2;
            activeCard = "card2";
        } else {
            document.getElementById("card1").style.zIndex = 2;
            setProductCard2();
            document.getElementById("card2").style.zIndex = 1;
            activeCard = "card1";
        }
    };
}
