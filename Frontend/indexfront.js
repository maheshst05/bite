//side frame for about
var sideFrame = document.getElementById("side-frame");
var hideButton = document.getElementById("hide-button");
const popup = document.getElementById("popup");
var loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", function () {
sideFrame.style.left = "0"; // Slide in the frame from the left
});
if (hideButton) {
  hideButton.addEventListener("click", function () {
    sideFrame.style.left = "-500px"; // Slide out the frame to the left
  });
}




//nav
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const scrolled = window.scrollY > 0;
if (scrolled) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});




//login.html
let lb = document.getElementById("lb");

let sign = document.getElementById("s");
let sup = document.getElementById("sup");
let log = document.getElementById("log");


//if i user hasn't accounte then signup page show
if (sup) {
  sup.addEventListener("click", () => {
    
    l.style.display = "none";
    sign.style.display = "flex";
  });
}

//if use are sigup successful then signup form display none ahd login from shpow
if (log) {
  log.addEventListener("click", () => {
    sign.style.display = "none";
    l.style.display = "flex";
  });
}

//fetch login route for login
let form = document.getElementById("login");
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
let user = document.getElementById("loginbutton");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
     const payload = {
      email: form.email.value,
      password: form.password.value,
    };

    fetch("http://localhost:9090/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        let m = res.msg;
      if (m == "login suceesfully") {
      let username=res.user[0].name
  
      // Show the popup
  popup.style.display = "block";
  popup.innerText="You are successfully logged in &#10004;"
  
  // Hide the popup after 2 seconds
  let s =  setTimeout(function() {
    popup.style.display = "none";
  },3000);
//if user logged in successfully then user token and user name strore in localstorage
 localStorage.setItem("Tokenkey", res.token);
localStorage.setItem("username", username);
return (location.href = "./index.html");
}
        msg.innerText = "**" + m + "**";
      })
      .catch((err) => console.log(err));
  });

}




//fetch sign up route for sign up
const signup = document.getElementById("singup");
if (signup) {
  signup.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = {
      name: signup.name.value,
      mobile: signup.mobile.value,
      email: signup.email.value,
      password: signup.password.value,
    };
    console.log(payload);
    fetch("http://localhost:9090/user/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        let m = res.msg;
        popup.style.display = "block";
      popup.innerText=m
        // Hide the popup after 2 seconds
        let s =  setTimeout(function() {
          popup.style.display = "none";
        },3000);
        sign.style.display = "none";
        l.style.display = "flex";
      })
      .catch((err) => console.log(err));
  });
}

//shop

let prodname = document.getElementById("prodname");
container = document.getElementById("container");
let t = document.getElementById("t");
function myFunction() {
  fetch("http://localhost:9090/prod/prod", {
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      //console.log(res)
      show(res);
    })
    .catch((err) => console.log(err));
}

//oral care

let oral = document.getElementById("oral");
if (oral) {
  oral.addEventListener("click", () => {
    fetching("oral care");
    prodname.innerText = "Oral care";
    t.innerText = "Build Your Own Plastic-Free Routine";
  });
}

//personal
let personal = document.getElementById("personal");
if (personal) {
  personal.addEventListener("click", () => {
    fetching("Personal care");
    prodname.innerText = "Personal care";
    t.innerText = "Build Your Own Plastic-Free Routine";
  });
}

//bundles
let bundles = document.getElementById("bundles");
if (bundles) {
  bundles.addEventListener("click", () => {
    fetching("Bundles");
    prodname.innerText = "Bundles";
    t.innerText = "Build Your Own Plastic-Free Routine";
  });
}

//community
let community = document.getElementById("community");
if (community) {
  community.addEventListener("click", () => {
    fetching("community");
    prodname.innerText = "Community Favorites";
    t.innerText = "Build Your Own Plastic-Free Routine";
  });
}

//all
let all = document.getElementById("all");
if (all) {
  all.addEventListener("click", () => {
    myFunction();
    prodname.innerText = "All Products";
    t.innerText = " ";
  });
}

function fetching(category) {
  fetch(`http://localhost:9090/prod/cat?title=${category}`, {
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log(res)
      let arr = res
      show(arr);
    })
    .catch((err) => console.log(err));
}
//show


const productsPerPage = 6;
const totalPages = Math.ceil(products.length / productsPerPage);

function show(arr,page) {
  container.innerHTML = "";
  arr.forEach((element) => {
    let prov = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", element.avtar);

    let name = document.createElement("h5");
    name.innerText = element.title;
    //name.setAttribute("class","dec")
    let d = document.createElement("div");

    let desc = document.createElement("p");
    desc.innerText = element.decs;
    desc.style.textDecoration = "bold";
    //desc.style.fontStyle = "italic";
    desc.setAttribute("class", "dec");
    let price = document.createElement("p");
    price.innerText = "Rs." + " " + element.price;
    d.setAttribute("class", "d");
    d.append(desc, price);
    let btn = document.createElement("div");

    let card = document.createElement("div");
    card.innerText = "Add to cart";
    btn.setAttribute("class", "button");
    btn.append(card);
    //add to card
    btn.addEventListener("click", () => {
      payload = {
        prodID: element._id,
        avtar: element.avtar,

        desc: element.decs,
        price: element.price,
      };
      //console.log(payload);

      fetch("http://localhost:9090/cart/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          as: localStorage.getItem("Tokenkey"),
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data)
       
          // Show the popup
  popup.style.display = "block";
popup.innerText=data.msg
  // Hide the popup after 2 seconds
  setTimeout(function() {
    popup.style.display = "none";
  },5000);
        });
    });
    prov.append(img, name, d, btn);
    container.append(prov);
  });
}

//cart.html
let cartcontainer = document.getElementById("con");
let ch = document.getElementById("ch1")
let tt = document.getElementById("tt");
function cart() {
  fetch("http://localhost:9090/cart/get", {
    headers: {
      "Content-type": "application/json",
      as: localStorage.getItem("Tokenkey"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      let data = res;
     // popup.style.display = "block";
// popup.innerText=res.msg
//   // Hide the popup after 2 seconds
//   setTimeout(function() {
//     popup.style.display = "none";
//   },1000);


      if (res.msg == "No cart found") {
      let h2 = document.createElement("h2");

      let pa = document.createElement("p"); 
      pa.innerText = "Must add items on the cart before you proceed to check out.";
      ch.style.display="none"
      tt.style.display="none"
      ret = document.createElement("button");
      ret.innerText="Return to shop"
      ret.addEventListener("click",()=>{
        location.href="./shop.html";
      })
      ret.setAttribute("class", "ret")
      
      h2.innerText = "Oops! your cart is empty !";
      cartcontainer.style.textAlign="center";
        cartcontainer.append(h2,pa,ret)
        
      
      }
      cartshow(data);
    });
}

let tbody = document.getElementById("tbody");

function cartshow(data) {
  tbody.innerHTML = "";
  data.forEach((element, index) => {
    let td = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src", element.avtar);
    td.append(img);
    let td1 = document.createElement("td");
    td1.innerText = element.desc;
    
    let td3 = document.createElement("td");
    td3.textContent = element.price + " Rs.";

    let td5 = document.createElement("div");
    let plus = document.createElement("h2");
    plus.innerHTML = "-";
    plus.addEventListener("click",()=>{
    
fetch(`http://localhost:9090/cart/update/${element._id}`,{
  method: "PATCH",
    headers:{
      "Content-type": "application/json",
      "as": localStorage.getItem("Tokenkey"),
     },
     body:JSON.stringify({Quantity:element.Quantity-1})
})
.then((response) => {
  return response.json();
})
.then((response) => {

cart()

})



    })

    let td4 = document.createElement("div");
    td4.innerText = element.Quantity;
    td4.setAttribute("class", "btns");

    let munus = document.createElement("h2");
    munus.innerText = "+";
    munus.addEventListener("click", ()=>{
      fetch(`http://localhost:9090/cart/update/${element._id}`,{
  method: "PATCH",
    headers:{
      "Content-type": "application/json",
      "as": localStorage.getItem("Tokenkey"),
     },
     body:JSON.stringify({Quantity:element.Quantity+1})
})
.then((response) => {
  return response.json();
})
.then((response) => {

cart()

})
    })

    td5.style.display = "flex";
    td5.append(plus, td4, munus);
//remove cart
    let remove = document.createElement("td");
    remove.setAttribute("class", "fa-sharp fa-solid fa-xmark");
    remove.addEventListener("click", () => {
      fetch(`http://localhost:9090/cart/delete/${element._id}`, {
      method: "DELETE",
      headers:{
        "Content-type": "application/json",
        as: localStorage.getItem("Tokenkey"),
       }
    })
      .then(response => response.json())
      .then((response) =>{
        
            console.log(response.msg)
       
          // Show the popup
  popup.style.display = "block";
popup.innerHTML = response.msg
  // Hide the popup after 2 seconds
  setTimeout(function() {
    popup.style.display = "none";
  },1000);
        cart()
      })
      //alert("Tokenkey")
    });

    let tdb = document.createElement("td");
    tdb.append(remove);

    let tr = document.createElement("tr");
    tr.append(td, td1, td3, td5, tdb);
    tbody.append(tr);
  });
}

let un = localStorage.getItem("username")
if(un.length > 0) {
  showusername(un)
}
function showusername(username){
   user.style.display="block"
  lb.style.display ="none"  
  user.append(username)
}

//logut

var logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", function() {
  
  localStorage.clear();
location.reload();

          // Show the popup
          popup.style.display = "block";
          popup.innerHTML = "Logout Successfully"
            // Hide the popup after 2 seconds
            setTimeout(function() {
              popup.style.display = "none";
            },1000);
});