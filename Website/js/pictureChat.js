var imageB64 = "";
var chatHistory = "";
//Set up on load events
window.addEventListener('DOMContentLoaded', pageFirstLoad, false);

async function pageFirstLoad() {
    document.querySelector("#inputFile").addEventListener("change", readFile);
}

function readFile() {
    document.getElementById("Dave").innerHTML = this.files[0].name;
    const imageReader = new FileReader();
    imageReader.onload = function() {
        imageB64 = imageReader.result;
    }
    imageReader.readAsDataURL(this.files[0]);
    doChat();
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
    const chatResponse = await getChat();
    const newMessage = chatResponse.choices[0].message.content
    //chatHistory.push(newMessage);
    document.getElementById("Dave").innerHTML += "<span class=\"botComment\">" + newMessage + "</span>";
    //document.getElementById("chatInput").addEventListener("keypress", onKeyPress);
}