//Set up on load events
window.addEventListener('DOMContentLoaded', pageFirstLoad, false);

async function pageFirstLoad() {
    userInfo = await getUserInfo();
    if (userInfo.clientPrincipal != null) {
        document.getElementById("rightColumn").innerHTML = userInfo.clientPrincipal.userDetails + " <a href=\"/.auth/logout\">(Logout)</a>";
    } else {
        document.getElementById("rightColumn").innerHTML = "<a href=\"/.auth/login/aadb2c\">Login</a>";
    }
}