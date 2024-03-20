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

//get Attribute score details of the product
async function getProductAttributeScores() {
    const response = await fetch("https://prod2-03.swedencentral.logic.azure.com:443/workflows/4ad6606c2d514a2cb1bb1c81d2020e54/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uzcf9_OPt7dYNrpY_qPqf0N2bIfS1kDuHVJZahK2d_0", {
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

//get Occasion score details of the product
async function getProductOccasionScores() {
    const response = await fetch("https://prod2-28.swedencentral.logic.azure.com:443/workflows/9a7cdc7452804b5ea20a869e79f1f574/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZIqeXETw6EPz3-A9TlrV35fL7YLHGAjXuNoC5e6_1LM", {
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

//get all products by Attribute
async function getProductsByAttribute(attributeName) {
    const response = await fetch("https://prod2-17.swedencentral.logic.azure.com:443/workflows/021ac46724bc48b5b73a7b2167198326/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=c00SMNcAkKlN1MsRP2nF4aT6082EgG_k9oGz5S0-qno", {
        method: "POST",
        body: JSON.stringify({
            "attributeName": attributeName
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

//get all products by Occasion
async function getProductsByOccasion(occasionName) {
    const response = await fetch("https://prod2-28.swedencentral.logic.azure.com:443/workflows/d2289f98cfd54501919ef9990e1704a1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4m7rVJLiUr4_UTqFqgF7D1I9KtTJBgiE5zwQfIwnGS0", {
        method: "POST",
        body: JSON.stringify({
            "occasionName": occasionName
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

//get Attributes
async function getAttributes() {
    const response = await fetch("https://prod2-17.swedencentral.logic.azure.com:443/workflows/98e27328dcbc4a70baf730170f4c80f7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZRFtAvwXW9yf29SPUJOpx9_P9zmnPXcV1p5wjmfS3jU", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

//get Occasions
async function getOccasions() {
    const response = await fetch("https://prod2-18.swedencentral.logic.azure.com:443/workflows/8d0ec63f8d8d4ab186ec92ebb1df691e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=m3QKDLBJOWwBiifSD6yVuDVS5ZSRjTwQxXQOhZsC4QY", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    return response.json(); // parses JSON response into native JavaScript objects
}