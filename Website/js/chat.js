const product = urlParams.get('productID')

//Set up on load events
window.addEventListener('DOMContentLoaded', pageFirstLoad, false);

async function pageFirstLoad() {
    document.getElementById("body").innerHTML = product;
}