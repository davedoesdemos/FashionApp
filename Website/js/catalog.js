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
    document.getElementById("occasionSelector").innerHTML = "<option value=\"Occasion\">Occasion</option><br />";
    occasions.forEach(element => {
        document.getElementById("occasionSelector").innerHTML += "<option value=\"" + element.occasionName + "\">" + element.occasionName + "</option><br />";
    });
    const attributes = await getAttributes();
    document.getElementById("attributeSelector").innerHTML = "<option value=\"Attribute\">Attribute</option><br />";
    attributes.forEach(element => {
        document.getElementById("attributeSelector").innerHTML += "<option value=\"" + element.attributeName + "\">" + element.attributeName + "</option><br />";
    });
    
    document.getElementById("occasionSelector").addEventListener("change", occasionChanged);
    document.getElementById("attributeSelector").addEventListener("change", attributeChanged);
}

function occasionChanged() {
    const occasion = document.getElementById("occasionSelector").value;
    getCatalog("occasion", occasion);
}

function attributeChanged() {
    const attribute = document.getElementById("attributeSelector").value;
    getCatalog("attribute", attribute);
}

function getCatalog(type, tag) {
    if (type == "occasion") {
        getProductsByOccasion(tag).then((products) => {
            document.getElementById("productPane").innerHTML = "<div class=\"tagHeader\">" + tag + "</div>";
            products.forEach(element => {
                document.getElementById("productPane").innerHTML += "<div class=\"product\"><table><tr><td><img class=\"productImage\" src=\"" + element.imageLocation + "\" /></td><td>" + element.score.toString() + "/10 for " + tag + "<br />" + element.comment + "<br /><br />" + element.productDescription + "<a href=\"showProduct.html?productID=" + element.productID + "\">Show Product Detail</a> <a href=\"chat.html?productID=" + element.productID + "\">Chat about product</a></td></tr></table><br /></div>";
            });
        });
    } else {
        getProductsByAttribute(tag).then((products) => {
            document.getElementById("productPane").innerHTML = "<div class=\"tagHeader\">" + tag + "</div>";
            products.forEach(element => {
                document.getElementById("productPane").innerHTML += "<div class=\"product\"><table><tr><td><img class=\"productImage\" src=\"" + element.imageLocation + "\" /></td><td>" + element.score.toString() + "/10 for " + tag + "<br />" + element.comment + "<br /><br />" + element.productDescription + "<a href=\"showProduct.html?productID=" + element.productID + "\">Show Product Detail</a> <a href=\"chat.html?productID=" + element.productID + "\">Chat about product</a></td></tr></table><br /></div>";
            });
        });
    }
}