//Set up on load events
window.addEventListener('DOMContentLoaded', pageFirstLoad, false);

async function pageFirstLoad() {   
    userInfo = await getUserInfo();
    if (userInfo.clientPrincipal != null) {
        document.getElementById("loginbox").innerHTML = userInfo.clientPrincipal.userDetails + " <a href=\"/.auth/logout\">(Logout)</a>";
    } else {
        document.getElementById("loginbox").innerHTML = "<a href=\"/.auth/login/aadb2c\">Login</a>";
    }
    var userID = userInfo.clientPrincipal.userId;
    const userScores = getUserScores(userID)
    
    document.getElementById("userScores").innerHTML = "<tr><th>Attribute</th><th>Like</th><th>Dislike</th></tr>";
    userScores.forEach(element => {
        document.getElementById("userScores").innerHTML += "<tr><td>" + element.attributeName + "</td><td>" + element.like + "</td><td>" + element.dislike + "</td></tr>";
    })

}