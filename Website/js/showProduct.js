const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productID = urlParams.get('productID')

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
    var productAttributeScores = await getProductAttributeScores();
    document.getElementById("cellImage").innerHTML = "<img class=\"productImage\" src=\"" + productDetails.imageLocation + "\" />";
    document.getElementById("cellName").innerHTML = productDetails.productName;
    document.getElementById("cellDescription").innerHTML = productDetails.productDescription;
    productAttributeScores.forEach(element => {
        document.getElementById("cellDetails").innerHTML += "<span class=\"attributeScoreDetails\">" + element.attributeName; + " " + element.score + " " + element.comment "</span><br />";
    });
    

}