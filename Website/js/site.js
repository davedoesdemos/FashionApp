//variables
var userInfo = null;

async function getUserInfo() {
    const response = await fetch('/.auth/me');
    const userDetails = await response.json();
    return userDetails;
}

//get details of the product
async function getProductDetails() {
    const response = await fetch("https://prod2-15.swedencentral.logic.azure.com:443/workflows/79ba787fefb74ca298488f8c2d001646/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6gD02z2MdXg6D1EC9Ijgky4teugiBtjSDHdNRCoSy-I", {
        method: "POST",
        body: JSON.stringify({
            "productID": productID
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return response.json(); // parses JSON response into native JavaScript objects
}