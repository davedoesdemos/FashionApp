var imageB64 = "";
var chatHistory = [];
//Set up on load events
window.addEventListener('DOMContentLoaded', pageFirstLoad, false);

async function pageFirstLoad() {
    userInfo = await getUserInfo();
    if (userInfo.clientPrincipal != null) {
        document.getElementById("loginboxCell").innerHTML = userInfo.clientPrincipal.userDetails + " <a href=\"/.auth/logout\">(Logout)</a>";
    } else {
        document.getElementById("loginboxCell").innerHTML = "<a href=\"/.auth/login/aadb2c\">Login</a>";
    }
    document.querySelector("#inputFile").addEventListener("change", readFile);
}

function readFileAsData(file) {
    return new Promise((resolve, reject) => {
        const imageReader = new FileReader();
  
        imageReader.onloadend = function() {
            resolve(imageReader.result);
        }
  
        imageReader.onerror = reject;
  
        imageReader.readAsDataURL(file);
    });
  }

async function readFile() {
    imageB64 = "";
    chatHistory = [];
    document.getElementById("chatWindow").innerHTML = "";
    document.getElementById("fileName").innerHTML =  this.files[0].name;
    imageB64 = await readFileAsData(this.files[0]);
    document.getElementById("chatWindow").innerHTML = "<span class=\"imageComment\"><img class=\"productImage\" src=\"" + imageB64 + "\" /></span>";
    doChat();
    document.getElementById("chatInput").addEventListener("keypress", onKeyPress);
}

//Get a new chat response from the chat API
async function getChat() {
    //send the results to the API
    const response = await fetch("https://prod2-10.swedencentral.logic.azure.com:443/workflows/bee876c18e2a408c9ff68004329db8bd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WgpBBXl_5x0uP3IFt-gGsnb7hjplMW3wz38-9eEmHrI", {
        method: "POST",
        body: JSON.stringify({
          "imageLocation": imageB64,
          "chatHistory": chatHistory
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function doChat() {
    var chatResponse = await getChat();
    var newMessage = chatResponse.choices[0].message.content;
    chatHistory.push(newMessage);
    document.getElementById("chatWindow").innerHTML += "<span class=\"botComment\">" + newMessage + "</span>";
    window.scrollTo(0, document.body.scrollHeight);
}

function onKeyPress(e) {
  if (e.key === "Enter") {
      chatHistory.push(document.getElementById("chatInput").value);
      document.getElementById("chatWindow").innerHTML += "<span class=\"humanComment\">" + document.getElementById("chatInput").value + "</span>";
      document.getElementById("chatInput").value = "";
      doChat();
  }
}