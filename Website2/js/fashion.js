window.addEventListener('DOMContentLoaded', pageFirstLoad(), false);

function pageFirstLoad() {
    setProductCard1();
    setProductCard2();
}

async function getProduct() {
    // Default options are marked with *
    const response = await fetch("https://prod2-14.swedencentral.logic.azure.com/workflows/a1a299d5324348fa900f7614a564678e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RuJ9a0HFopoPwAA4iYEUNRL8qpkCkKIP96WN-wz1tOo", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    });
    //const data = await response.json();
    return response.json(); // parses JSON response into native JavaScript objects
  }

async function setProductCard1() {
    newProduct = await getProduct();
    document.getElementById("card1ImageBox").innerHTML = "                    <img class=\"cardImage\" src=\"" + newProduct.imageLocation + "\" />";
    document.getElementById("card1Text").innerHTML = newProduct.Description;
}

async function setProductCard2() {
    newProduct = await getProduct();
    document.getElementById("card2ImageBox").innerHTML = "                    <img class=\"cardImage\" src=\"" + newProduct.imageLocation + "\" />";
    document.getElementById("card2Text").innerHTML = newProduct.Description;
}