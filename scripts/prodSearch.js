"use strict"

window.onload = () => {

    hideCategoriesDropdown();
    populateDropdown();
    //hideTableHead();

    //hideTable(); later when when we choose "";
    let categoryDropdown = document.querySelector("#categoryDropdown");

    let theDropdown = document.querySelector("#productSearchDDL");

    theDropdown.addEventListener("change", viewAll);
    categoryDropdown.addEventListener("change", viewCatData);
}


//somwhere show heading for next table , create command on change?


//    let proList = await allData();

    
//     if (theDropdown.value === "viewAll") {
//         theTitles.removeAttribute("style")
//         theProducts.forEach((product) => {
// }

// let theDropdown = document.querySelector("#productSearchDDL");
   // let theProducts = await viewAllData();
    // let theCategories = await categoryData();
   // let tbody = document.querySelector("#tableBody")
//
  //  if (theDropdown.value === "") {
 //       document.querySelector("#productSearchDDL").selectedIndex = 0;
 //       document.querySelector("#tableBody").innerHTML = "";
  // hideCategoriesDropdown();
  ///      theTitles.setAttribute("style", "display: none")

//    }

 //   if (theDropdown.value === "viewAll") {
  //      theTitles.removeAttribute("style")
   //     theProducts.forEach((product) => {

async function categoryData(categoryId){
    
    try{ 
        let response = await fetch("http://localhost:8081/api/products/bycategory/" + categoryId)
        let products = await response.json();
        return products
    } catch(err){
    console.log("hey dude wya")
    
}
}

async function viewCatData(event) {

    let selectedCat = event.target.value

    let tbody = document.querySelector("#tableBody");

    tbody.innerHTML = "";

    //stop forgetting these need to be close CANDICE!
    let products = await categoryData(selectedCat);
    products.forEach((product) => {
        makeTable(tbody, product)

        console.log(product);

    })
    

}

async function populateDropdown() {
    let categoryDropdown = document.querySelector("#categoryDropdown");

    let categories = await catList();

    //building the dropdown in this funct to make cats populate
    let defaultOption = document.createElement("option");
    defaultOption.value = "";

    defaultOption.innerText = "Select Category";

    categoryDropdown.appendChild(defaultOption);

    categories.forEach((categories) => {
        //put categories in the select 
        let theOption = document.createElement("option")

        theOption.value = categories.categoryId;

        theOption.textContent = categories.name;

        categoryDropdown.appendChild(theOption);

    });
}

async function catList() {

    try {
        let response = await fetch("http://localhost:8081/api/categories");
        let theCats = await response.json();

        return theCats;
    } catch (err) {
        console.log("nah")
        throw new Error(err)
    }

}

async function viewAll() {
    let theDropdown = document.querySelector("#productSearchDDL");
    let theProducts = await viewAllData();
    // let theCategories = await categoryData();
    let tbody = document.querySelector("#tableBody")

    if (theDropdown.value === "") {
        document.querySelector("#productSearchDDL").selectedIndex = 0;
        document.querySelector("#tableBody").innerHTML = "";
        hideCategoriesDropdown();
        theTitles.setAttribute("style", "display: none")

    }

    if (theDropdown.value === "viewAll") {
        theTitles.removeAttribute("style")
        theProducts.forEach((product) => {
            //call the funtion to build row
            //pass to row //tbody
            //pass what goes in the rows the data/products
            makeTable(tbody, product)

        })
        hideCategoriesDropdown();
        console.log("you greedy dawg")
    }
    if (theDropdown.value === "category") {

        showCategoriesDropdown();
        theTitles.setAttribute("style", "display: none")
        document.querySelector("#tableBody").innerHTML = "";

        console.log("let see what we have here");
    }

}

function hideCategoriesDropdown() {
    let theDrop = document.querySelector("#categoryDropdown");
    theDrop.style.display = "none";
}

function showCategoriesDropdown() {
    let choice = document.querySelector("#categoryDropdown");
    choice.style.display = "block";
}

function makeTable(tbody, someData) {
    let row = tbody.insertRow();

    let productCell = row.insertCell();
    productCell.innerHTML = someData.productName;

    let productSupplierCell = row.insertCell();
    productSupplierCell.innerHTML = someData.supplier;

    let productPriceCell = row.insertCell();
    productPriceCell.innerHTML = "$" + Number(someData.unitPrice).toFixed(2);

    let productQuantityCell = row.insertCell();
    productQuantityCell.innerHTML = someData.unitsInStock;

    let productDetailsCell = row.insertCell();
    //put the relevent course data in the
    productDetailsCell.innerHTML = `
    <a href="./product_details.html?productid=${someData.productId}">See Details</a>
    `

}

async function viewAllData() {

    try {
        let response = await fetch("http://localhost:8081/api/products");
        let products = await response.json();

        return products;
    } catch (err) {
        console.log("nerp")
        throw new Error(err)
    }

}


