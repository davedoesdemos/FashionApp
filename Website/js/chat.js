const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productID = urlParams.get('productID')
var imageLocation = "";
const chatHistory = [];

//Set up on load events
window.addEventListener('DOMContentLoaded', pageFirstLoad, false);

async function pageFirstLoad() {   
    userInfo = await getUserInfo();
    if (userInfo.clientPrincipal != null) {
        document.getElementById("loginbox").innerHTML = userInfo.clientPrincipal.userDetails + " <a href=\"/.auth/logout\">(Logout)</a>";
    } else {
        document.getElementById("loginbox").innerHTML = "<a href=\"/.auth/login/aadb2c\">Login</a>";
    }
    const productDetails = await getProductDetails();
    imageLocation = productDetails.imageLocation;
    document.getElementById("imageHolder").innerHTML = "<img class=\"productImage\" src=\"" + productDetails.imageLocation + "\" />";
    doChat();
}

//Get a new chat response from the chat API
async function getChat() {
    //send the results to the API
    const response = await fetch("https://prod2-10.swedencentral.logic.azure.com:443/workflows/bee876c18e2a408c9ff68004329db8bd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WgpBBXl_5x0uP3IFt-gGsnb7hjplMW3wz38-9eEmHrI", {
        method: "POST",
        body: JSON.stringify({
          "imageLocation": imageLocation,
          "chatHistory": chatHistory
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function doChat() {
    const chatResponse = await getChat();
    const newMessage = chatResponse.choices[0].message.content
    chatHistory.push(newMessage);
    document.getElementById("chatWindow").innerHTML += "<span class=\"botComment\">" + newMessage + "</span>";
    document.getElementById("chatInput").addEventListener("keypress", onKeyPress);
}

function onKeyPress(e) {
    if (e.key === "Enter") {
        chatHistory.push(document.getElementById("chatInput").value);
        document.getElementById("chatWindow").innerHTML += "<span class=\"humanComment\">" + document.getElementById("chatInput").value + "</span>";
        document.getElementById("chatInput").value = "";
        doChat();
    }
}

