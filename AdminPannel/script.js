
// JavaScript code for handling menu clicks and showing respective content
const menuItems = document.querySelectorAll('.sidebar li');
let dashboardt = document.getElementsByClassName("dashboard-content")
//dashboardt.classList.remove('active')
const contentSections = document.querySelectorAll('.content > div');
let popup = document.getElementById("popup");
function handleMenuItemClick() {
  const targetContentId = this.id;

  // Hide all content sections
  contentSections.forEach(section => {
    section.style.display = 'none';
  });

  // Show the respective content section
  const targetContent = document.querySelector(`.${targetContentId}-content`);
  targetContent.style.display = 'block';

  // Remove active class from all menu items
  menuItems.forEach(item => item.classList.remove('active'));

  // Add active class to the clicked menu item
  this.classList.add('active');
}

// Add click event listeners to menu items
menuItems.forEach(item => item.addEventListener('click', handleMenuItemClick));

let totalprod = document.getElementById("totalprod")
let totaluser = document.getElementById("totaluser")


// for users sections
 usersf()
 function usersf() {
   fetch('http://localhost:9090/user', {
     headers: {
       'Content-Type': 'application/json'
     }
   })
     .then(res => { return res.json() })
     .then(res => {
     //  console.table(res)
     let user =res
     totaluser.innerText=res.length
       showUser(user)
     })
 }
 
 
 
     const usersPerPage = 9; // Number of users to display per page
     let currentPageuser = 1; // Current page number
 
     // Function to display users for a given page
 function showUser(users){
   
     function displayUsers(pageNumber) {
       console.log(users)
       const tableBody = document.getElementById("userTableBody");
       tableBody.innerHTML = "";
 
       const startIndex = (pageNumber - 1) * usersPerPage;
       const endIndex = startIndex + usersPerPage;
 
       for (let i = startIndex; i < endIndex && i < users.length; i++) {
         const element = users[i];
 
         const row = document.createElement("tr");
 
 const avatarCell = document.createElement("td");
 const avatarImage = document.createElement("img");
 avatarImage.setAttribute("src", "https://www.svgrepo.com/show/192244/man-user.svg")
 avatarImage.classList.add("avatar");
 avatarCell.appendChild(avatarImage);
 row.appendChild(avatarCell);
 
 const nameCell = document.createElement("td");
 nameCell.textContent = element.name;
 row.appendChild(nameCell);
 
 const mobileCell = document.createElement("td");
 mobileCell.textContent = element.mobile;
 row.appendChild(mobileCell);
 
 const emailCell = document.createElement("td");
 emailCell.textContent = element.email;
 row.appendChild(emailCell);
 
 const actionCell = document.createElement("td");
 
 const deleteButton = document.createElement("button");
 deleteButton.textContent = "Delete";
 deleteButton.classList.add("delete-button");
 deleteButton.addEventListener("click", () => {
   fetch(`http://localhost:9090/user/delete/${element._id}`, {
     method: "DELETE",
     headers: {
       'Content-Type': 'application/json'
     }
   })
     .then(res => { return res.json() })
     .then(res => {
       // Show the popup
       popup.style.display = "block";
           popup.innerHTML = res.msg
           // Hide the popup after 2 seconds
           setTimeout(function () {
             popup.style.display = "none";
           }, 1000);
         
       usersf()
       
     })
 });
 actionCell.appendChild(deleteButton);
 
 const revokeButton = document.createElement("button");
 
 revokeButton.textContent = "Revoke";
 revokeButton.classList.add("revoke-button");
 revokeButton.setAttribute("class","revoke");
 revokeButton.addEventListener("click", function () {
  
 });
 actionCell.appendChild(revokeButton);
 
 row.appendChild(actionCell);
 
 tableBody.appendChild(row);
       }
     }
   
     // Function to handle pagination
     function handlePagination() {
       const totalPages = Math.ceil(users.length / usersPerPage);
       const pagination = document.getElementById("paginationuser");
       pagination.innerHTML = "";
 
       for (let i = 1; i <= totalPages; i++) {
         const button = document.createElement("button");
         button.innerText = i;
         button.onclick = function() {
           currentPageuser = i;
           displayUsers(currentPageuser);
         };
 
         pagination.appendChild(button);
       }
     }
 
 
     // Initial setup
     displayUsers(currentPageuser);
     handlePagination();
   }






//**************************** */

//add Products to the Db
let addproduct = document.getElementById("addproduct")
addproduct.addEventListener("submit",(e)=>{
  e.preventDefault()
  let payload ={
    title:addproduct.title.value,
    avtar:addproduct.avtar.value,
    category: addproduct.category.value,
    decs: addproduct.desc.value,
    price: addproduct.price.value,
    Qyt:addproduct.Qyt.value
  }
   
  fetch("http://localhost:9090/prod/add",{
    method:"POST",
    headers:{
        "Content-type":"application/json",
        "as":localStorage.getItem("token")
    },
    body:JSON.stringify(payload)
}).then(res=>res.json())
.then(res=>{
// Show the popup
popup.style.display = "block";
popup.innerHTML = "Product added successfully!"
  // Hide the popup after 2 seconds
  setTimeout(function() {
    popup.style.display = "none";
  },2000);  
})
.catch(err=>{console.log(err)})

})

// for product list
const updateFormPopup = document.getElementById("update-form-popup");
const updateForm = document.getElementById("update-form");
const prodId = document.getElementById("prodId");
const updateImg = document.getElementById("update-img")
const updateTitle = document.getElementById("update-title");
const updateDescription = document.getElementById("update-description");
const updatePrice = document.getElementById("update-price");
const updateQuantity = document.getElementById("update-quantity");
const updateCategory = document.getElementById("update-category");
const closeButton = document.getElementById("close-button");

    // Sample product data
    fetchProducts()
function fetchProducts() {
  fetch("http://localhost:9090/prod/prod", {
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    let products = response;
    totalprod.innerText= response.length
    display(response)
  });
}
 const productsPerPage = 9; // Number of products to display per page
    let currentPage = 1; // Current page number

    // Function to display products for a given page
    function display(products) {
    function displayProducts(pageNumber) {
      const productList = document.getElementById("productTableBody");
    productList.innerHTML = "";
 
    const startIndex = (pageNumber - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;

      for (let i = startIndex; i < endIndex && i < products.length; i++) {
        const product = products[i];

  const row = document.createElement("tr");

    const avatarCell = document.createElement("td");
    const avatarImage = document.createElement("img");
    avatarImage.src = product.avtar;

    avatarImage.classList.add("avatar");
    avatarCell.appendChild(avatarImage);
    row.appendChild(avatarCell);

    const titleCell = document.createElement("td");
    titleCell.textContent = product.title;
    row.appendChild(titleCell);

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = product.decs;
    row.appendChild(descriptionCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = product.price;
    row.appendChild(priceCell);

    const quantityCell = document.createElement("td");
    quantityCell.textContent = product.Qyt;
    row.appendChild(quantityCell);

    const categoryCell = document.createElement("td");
    categoryCell.textContent = product.category;
    row.appendChild(categoryCell);

    const actionCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", function() {
      setProductDataForUpdate(product);
      showUpdateForm();
    });
    actionCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    
    actionCell.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
  fetch(`http://localhost:9090/prod/delete/${product._id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  })
  .then(response => response.json())
  .then(response => {
    popup.style.display = "block";
popup.innerHTML = "Deleted successfully!"
  // Hide the popup after 2 seconds
  setTimeout(function() {
    popup.style.display = "none";
  },2000);
    fetchProducts(); // Call the fetchProducts function to update the product list
  });
});
      
//products()
    row.appendChild(actionCell);

    productList.appendChild(row);
 }
    }

    // Function to handle pagination
    function handlePagination() {
      const totalPages = Math.ceil(products.length / productsPerPage);
      const pagination = document.getElementById("pagination");
      pagination.innerHTML = "";

      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.onclick = function() {
          currentPage = i;
          displayProducts(currentPage);
        };

        pagination.appendChild(button);
      }
    }

    // Function to add a new product
    function addProduct() {
      // Add your logic to handle adding a new product
      console.log("Add product");
    }

    // Function to edit an existing product
    function editProduct(index) {
      // Add your logic to handle editing a product
      console.log("Edit product", index);
    }

    // Function to delete a product
    function deleteProduct(index) {
      // Add your logic to handle deleting a product
      console.log("Delete product", index);
    }

    // Initial setup
    displayProducts(currentPage);
    handlePagination();
    }


// Function to set product data in the update form
function setProductDataForUpdate(products) {
  //console.log(products)
   const product = products
   updateImg.value=products.avtar
   prodId.value = product._id; 
  updateTitle.value = product.title;
  updateDescription.value = product.decs;
  updatePrice.value = product.price;
  updateQuantity.value = product.Qyt;
  updateCategory.value = product.category;
}

// Function to show the update form popup
function showUpdateForm() {
  updateFormPopup.style.display = "block";
}

// Function to hide the update form popup
function hideUpdateForm() {
  updateFormPopup.style.display = "none";
}

// Event listener for the close button
closeButton.addEventListener("click", function() {
  hideUpdateForm();
});
//Function to Udate form
updateForm.addEventListener("submit", function(e) {
e.preventDefault();
 let payload = {
  avtar: updateImg.value,
  title: updateTitle.value,
  decs: updateDescription.value,
  price: updatePrice.value,
  Qyt: updateQuantity.value,
  category: updateCategory.value
 }
 let id =updateForm.prodId.value
 fetch(`http://localhost:9090/prod/update/${id}`,{
  method: 'PATCH',
  headers:{
    "Content-type": "application/json"
  },
  body:JSON.stringify(payload)
 })
 .then((response) => {
  return response.json();
})
.then((response) => {

// Show the popup
popup.style.display = "block";
popup.innerHTML = response.msg
  // Hide the popup after 2 seconds
  setTimeout(function() {
    popup.style.display = "none";
  },2000);
  fetchProducts()
 hideUpdateForm();
})

 
});

//logout
function Logout(){
  window.location.href = "index.html";
}