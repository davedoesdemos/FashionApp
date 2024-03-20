//Set up on load events
window.addEventListener('DOMContentLoaded', pageFirstLoad, false);

async function pageFirstLoad() {   
    userInfo = await getUserInfo();
    if (userInfo.clientPrincipal != null) {
        document.getElementById("loginbox").innerHTML = userInfo.clientPrincipal.userDetails + " <a href=\"/.auth/logout\">(Logout)</a>";
    } else {
        document.getElementById("loginbox").innerHTML = "<a href=\"/.auth/login/aadb2c\">Login</a>";
    }
    const occasions = await getOccasions();
    document.getElementById("occasionSelector").innerHTML = "";
    productAttributeScores.forEach(element => {
        document.getElementById("occasionSelector").innerHTML += "<option value=\"" + element.occasionName + "\">" + element.occasionName + "</option><br />";
    });
    const attributes = await getAttributes();
    document.getElementById("attributeSelector").innerHTML = "";
    productAttributeScores.forEach(element => {
        document.getElementById("attributeSelector").innerHTML += "<option value=\"" + element.attributeName + "\">" + element.attributeName + "</option><br />";
    });
}