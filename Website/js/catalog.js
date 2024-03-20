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
    occasions.forEach(element => {
        document.getElementById("occasionSelector").innerHTML += "<option value=\"" + element.occasionName + "\">" + element.occasionName + "</option><br />";
    });
    const attributes = await getAttributes();
    document.getElementById("attributeSelector").innerHTML = "";
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
            document.getElementById("productPane").innerHTML = "<h1>tag</h1><br />";
            products.forEach(element => {
                document.getElementById("productPane").innerHTML += "<div class=\"product\"><img class=\"productImage\" src=\"" + element.imageLocation + "\" /><br />" + element.score.toString() + "/10 for " + tag + " " + element.productName + "<br />" + element.productDescription + "<br /><button onclick=\"addToCart('" + element.productID + "</div>";
            });
        });
    } else {
        getProductsByAttribute(tag).then((products) => {
            document.getElementById("productPane").innerHTML = "";
            products.forEach(element => {
                document.getElementById("productPane").innerHTML += "<div class=\"product\"><img class=\"productImage\"  src=\"" + element.imageLocation + "\" /><br />" + element.score.toString() + "/10 for " + tag + " " + element.productName + "<br />" + element.productDescription + "<br /><button onclick=\"addToCart('" + element.productID + "</div>";
            });
        });
    }
}