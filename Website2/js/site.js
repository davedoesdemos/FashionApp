//variables
var userInfo = null;

async function getUserInfo() {
    const response = await fetch('/.auth/me');
    const userDetails = await response.json();
    return userDetails;
}