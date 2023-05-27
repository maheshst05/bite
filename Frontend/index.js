

  //side frame for about
  var loginButton = document.getElementById('login-button');
  var sideFrame = document.getElementById('side-frame');
  var hideButton = document.getElementById('hide-button');

  loginButton.addEventListener('click', function () {
    sideFrame.style.left = '0'; // Slide in the frame from the left
  });

  hideButton.addEventListener('click', function () {
    sideFrame.style.left = '-500px'; // Slide out the frame to the left
  });

  // cart
  var loginButtoncart = document.getElementById('cart-b');
  var sideFramecart = document.getElementById('side-frame-cart');
  var hideButtoncart = document.getElementById('hide-cart');

  loginButtoncart.addEventListener('click', function () {
    sideFramecart.style.right = '0'; // Slide in the frame from the right
  });

  hideButtoncart.addEventListener('click', function () {
    sideFramecart.style.right = '-500px'; // Slide out the frame to the right
  });

  //nav
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 0;
    
    if (scrolled) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


//   login-sign-up
let login = document.getElementById("container1")
let sign = document.getElementById("container2")

let up = document.getElementById("up")
let demo = document.getElementById("demo")

demo.addEventListener("click",()=>{
    console.log("yes")
})
up.addEventListener("click",()=>{
    login.style.display="none"
    console.log("helo")
})
